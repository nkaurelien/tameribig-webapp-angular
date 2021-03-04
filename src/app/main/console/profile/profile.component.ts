import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription, throwError} from 'rxjs';
import {ToastService} from 'ng-uikit-pro-standard';
import {User} from '@app/auth2/_models';
import {AuthService} from '@core/auth';
import {catchError, finalize, switchMap, takeUntil, tap} from 'rxjs/operators';
import {AllValidationErrors, getFormValidationErrors} from '@core/_helpers/get-form-validation-errors';

import {get} from 'lodash';
import firebase from 'firebase';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
    profilForm: FormGroup;
    authUser: User;
    fireUser: firebase.User;
    errors: string[] = [];
    defaultImageAvatar = '/assets/images/icons/masque-afrique.jpg';
    private isLoggedInSubscription: Subscription;
    unsubscribe = new Subject<boolean>();
    public loading = false;

    constructor(
        private auth: AuthService,
        private fb: FormBuilder,
        private toast: ToastService,
        private cdr: ChangeDetectorRef
    ) {

        this.authUser = new User();


    }

    ngOnInit() {
        this.subscribeLoginState();
        this.createForm();
    }

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }

    get addressInputGroup(): FormGroup {
        return this.profilForm && (this.profilForm.get('address') as FormGroup);
    }

    get socialLinksInputGroup(): FormGroup {
        return this.profilForm && (this.profilForm.get('socialLinks') as FormGroup);
    }

    get fullNameInput(): FormControl {
        return this.profilForm && (this.profilForm.get('fullName') as FormControl);
    }

    get phoneInput(): FormControl {
        return this.profilForm && (this.profilForm.get('phoneNumber') as FormControl);
    }

    get username() {
        let username = '';
        if (this.fireUser && this.fireUser.email !== undefined) {
            username = this.fireUser.email.split('@')[0];
        }
        return this.fireUser && this.fireUser.displayName !== undefined && this.fireUser.displayName !== null ?
            this.fireUser.displayName : username;
    }

    subscribeLoginState() {

        /* CHECK AUTH STATE */
        this.auth.fireAuth.fireUser().pipe(
            tap((user: firebase.User) => {
                if (!!user) {
                    this.fireUser = user;
                    this.authUser.fullName = user.displayName;
                    this.authUser.phoneNumber = user.phoneNumber;
                    this.authUser.email = user.emailVerified ? user.email : undefined;
                    this.authUser.uid = user.uid;
                    console.log({user}, this.authUser);
                    this.auth.apiAuth.backendAuthProfile();
                }
            }),
            switchMap((authUser) => {
                return this.auth.apiAuth.backendAuthProfile();
            }),
            takeUntil(this.unsubscribe),
        ).subscribe((response) => {
            this.authUser.init(response.data || response);
            this.fillForm(this.authUser);
        });
    }

    fillForm(user: User) {

        if (this.profilForm) {
            this.profilForm.patchValue({
                'address': {
                    'street': user.address.street,
                    'city': user.address.city,
                    'country': user.address.country
                },
                'socialLinks': {
                    'facebook': user.socialLinks.facebook,
                    'dribbble': user.socialLinks.dribbble,
                    'twitter': user.socialLinks.twitter,
                    'instagram': user.socialLinks.instagram,
                    'youtube': user.socialLinks.youtube,
                    'linkedin': user.socialLinks.linkedin,
                },
                'fullName': user.fullName,
                'phoneNumber': user.phoneNumber,
                'email': user.email,
                'about': user.about,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'occupation': user.occupation,
                'companyName': user.companyName
            });
        }
    }

    createForm() {

        const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        this.profilForm = new FormGroup({
            fullName: new FormControl(this.authUser.fullName, [Validators.nullValidator, Validators.maxLength(33)]),
            displayName: new FormControl(this.authUser.fullName, [Validators.nullValidator, Validators.maxLength(33)]),
            firstName: new FormControl(this.authUser.firstName, [Validators.nullValidator, Validators.maxLength(33)]),
            lastName: new FormControl(this.authUser.lastName, [Validators.nullValidator, Validators.maxLength(33)]),
            phoneNumber: new FormControl(this.authUser.phoneNumber, [Validators.required, Validators.minLength(9)]),
            about: new FormControl(this.authUser.about, [Validators.nullValidator]),
            occupation: new FormControl(this.authUser.occupation, [Validators.nullValidator]),
            companyName: new FormControl(this.authUser.companyName, Validators.nullValidator),
            address: this.fb.group({
                street: [this.authUser.address.street, Validators.nullValidator],
                city: [this.authUser.address.city, Validators.nullValidator],
                country: [this.authUser.address.country || 'Cameroun', Validators.nullValidator],
            }),
            socialLinks: this.fb.group({
                facebook: [this.authUser.socialLinks.facebook, [Validators.nullValidator, Validators.pattern(urlReg)]],
                dribbble: [this.authUser.socialLinks.twitter, [Validators.nullValidator, Validators.pattern(urlReg)]],
                twitter: [this.authUser.socialLinks.twitter, [Validators.nullValidator, Validators.pattern(urlReg)]],
                instagram: [this.authUser.socialLinks.instagram, [Validators.nullValidator, Validators.pattern(urlReg)]],
                youtube: [this.authUser.socialLinks.youtube, [Validators.nullValidator, Validators.pattern(urlReg)]],
                linkedin: [this.authUser.socialLinks.linkedin, [Validators.nullValidator, Validators.pattern(urlReg)]],
            })
        });

        this.profilForm.get('about').valueChanges.subscribe((value) => {
            this.authUser.about = value;
        });
    }

    submit() {
        const error: AllValidationErrors = getFormValidationErrors(this.profilForm.controls).shift();
        if (error) {
            console.log('this.profilForm.valid', this.profilForm.valid, this.profilForm.value, error);
            return;
        }

        if (this.profilForm.valid) {
            this.loading = true;
            // this.dropzone.processQueue();
            const data = {...this.authUser, ...this.profilForm.value};
            this.auth.fireAuth.updateUserData(data).subscribe();
            this.auth.apiAuth.updateUserData(data)
                .pipe(
                    catchError((serverError, __) => {
                        if (get(serverError, 'error.error.code') === 'auth/user-not-found') {
                        } else {
                            this.errors = ['Probleme d\'enregistrement'];
                            const options = {positionClass: 'md-toast-bottom-full-width'};
                            this.toast.info('Probleme d\'enregistrement', '', options);
                        }
                        return throwError(serverError);
                    }),
                    takeUntil(this.unsubscribe),
                    finalize(() => {
                        this.loading = false;
                        this.cdr.markForCheck();
                    })
                )
                .subscribe(response => {
                    this.authUser.init(response.data || response);
                    const options = {positionClass: 'md-toast-bottom-full-width'};
                    this.toast.success('Vos informations ont été correctement enregistrées', '', options);
                });
            // this.auth.updateUserData(this.profilForm.value);
        } else {
            // console.log(this.profilForm.errors);
            this.errors = ['Formulaire invalide'];
            const options = {positionClass: 'md-toast-bottom-full-width'};
            this.toast.info('Verifier votre formulaire', '', options);
        }
    }


}
