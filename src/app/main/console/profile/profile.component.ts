import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {of, Subject, Subscription} from 'rxjs';
import {ToastService} from 'ng-uikit-pro-standard';
import {User} from '@app/auth2/_models';
import {AuthenticationService} from '@app/auth2/_services';
import {AuthService} from "@core/auth";
import {switchMap, takeUntil, tap} from "rxjs/operators";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
  profilForm: FormGroup;
  authUser: User;
  errors: string[] = [];
  private isLoggedInSubscription: Subscription;
  defaultImageAvatar = '/assets/images/icons/masque-afrique.jpg';
    unsubscribe = new Subject<boolean>();


  constructor(
      private auth: AuthService,
      private fb: FormBuilder,
      private toast: ToastService
  )  {

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

  subscribeLoginState() {

      /* CHECK AUTH STATE */
      this.auth.fireAuth.fireUser().pipe(
          tap((user: firebase.User) => {
              if (!!user) {
                  this.authUser.fullName = user.displayName;
                  this.authUser.phoneNumber = user.phoneNumber;
                  this.authUser.email = user.emailVerified ? user.email : undefined;
                  this.authUser.uid = user.uid;
                  console.log({user}, this.authUser);
              }
          }),
          takeUntil(this.unsubscribe)
      ).subscribe();
  }

  createForm() {
    this.profilForm = new FormGroup({
        fullName: new FormControl(this.authUser.fullName, [Validators.required, Validators.maxLength(33)]),
        firstName: new FormControl(this.authUser.firstName, [Validators.nullValidator, Validators.maxLength(33)]),
        lastName: new FormControl(this.authUser.lastName, [Validators.nullValidator, Validators.maxLength(33)]),
      phoneNumber: new FormControl(this.authUser.phoneNumber, [Validators.required, Validators.minLength(9)]),
      about: new FormControl(this.authUser.about, [Validators.nullValidator]),
      occupation: new FormControl(this.authUser.occupation, [ Validators.nullValidator]),
      companyName: new FormControl(this.authUser.companyName,  Validators.nullValidator),
      address: this.fb.group({
        street: [this.authUser.address.street, Validators.nullValidator],
        city: [this.authUser.address.city, Validators.nullValidator],
        postCode: [this.authUser.address.postCode, Validators.nullValidator],
        country: [this.authUser.address.country || 'Cameroun', Validators.nullValidator],
      }),
      socialLinks: this.fb.group({
        facebook: [this.authUser.socialLinks.facebook, Validators.nullValidator],
        twitter: [this.authUser.socialLinks.twitter, Validators.nullValidator],
        instagram: [this.authUser.socialLinks.instagram, Validators.nullValidator],
        youtube: [this.authUser.socialLinks.youtube, Validators.nullValidator],
        linkedin: [this.authUser.socialLinks.linkedin, Validators.nullValidator],
      })
    });
  }


  get addressInputGroup(): FormGroup {
    return this.profilForm && (this.profilForm.get('address') as FormGroup);
  }

  get socialLinksInputGroup(): FormGroup {
    return this.profilForm && (this.profilForm.get('socialLinks') as FormGroup);
  }

  get fullNameInput(): FormControl {
    return this.profilForm && (this.profilForm.get('fullNameInput') as FormControl);
  }

  submit() {
    console.log('this.profilForm.valid', this.profilForm.valid, this.profilForm.value);
    if (this.profilForm.valid) {
      // this.dropzone.processQueue();
        this.auth.fireAuth.updateUserData(this.profilForm.value).subscribe();
        this.auth.apiAuth.updateUserData(this.profilForm.value).subscribe(response => {
            this.authUser.init(response);
        });
        // this.auth.updateUserData(this.profilForm.value);
    } else {
        console.log(this.profilForm.errors);
      this.errors = ['Formulaire invalide'];
      const options = { positionClass: 'md-toast-bottom-full-width' };
      this.toast.info('Verifier votre formulaire', '', options);
    }
  }
}
