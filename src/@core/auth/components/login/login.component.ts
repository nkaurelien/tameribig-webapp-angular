// Angular
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// RxJS
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, finalize, takeUntil, tap} from 'rxjs/operators';
// Translate
import {TranslateService} from '@ngx-translate/core';
// Store
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
// Auth
import {AuthNoticeService} from '../../auth-notice/auth-notice.service';
import {AuthFirebaseService, AuthService} from '../../_services';
import {Login} from '../../_actions/auth.actions';

import {get} from 'lodash';

/**
 * ! Just example => Should be removed in development
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
    // Public params
    loginForm: FormGroup;
    loading = false;
    loadingSocialFB = false;
    loadingSocialGoogle = false;
    isLoggedIn$: Observable<boolean>;
    errors: any = [];

    private unsubscribe: Subject<any>;

    private returnUrl: any;

    // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    /**
     * Component constructor
     *
     * @param router: Router
     * @param auth: AuthService
     * @param authNoticeService: AuthNoticeService
     * @param translate: TranslateService
     * @param store: Store<AppState>
     * @param fb: FormBuilder
     * @param cdr
     * @param route
     */
    constructor(
        private router: Router,
        private auth: AuthService,
        private fireAuth: AuthFirebaseService,
        private authNoticeService: AuthNoticeService,
        private translate: TranslateService,
        private store: Store<AppState>,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {
        this.unsubscribe = new Subject();
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit(): void {
        this.initLoginForm();

        // redirect back to the returnUrl before login
        this.route.queryParams.subscribe(params => {
            this.returnUrl = params['returnUrl'] || '/';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.authNoticeService.setNotice(null);
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.loading = false;
        this.loadingSocialFB = false;
    }

    /**
     * Form initalization
     * Default params, validators
     */
    initLoginForm() {


        this.loginForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.minLength(3),
                Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ])
            ],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])
            ]
        });
    }

    /**
     * Form Submit
     */
    submit() {
        const controls = this.loginForm.controls;
        /** check form */
        if (this.loginForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.loading = true;

        const authData = {
            email: controls['email'].value,
            password: controls['password'].value
        };
        this.fireAuth
            .firePasswordLogin(authData.email, authData.password)
            .pipe(
                tap(user => {
                    console.log({user});

                    if (user) {
                        this.store.dispatch(new Login({authToken: user.accessToken}));
                        this.router.navigateByUrl(this.returnUrl); // Main page
                    } else {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
                    }
                }),
                catchError((error, __) => {

                    if (get(error, 'error.error.code') === 'auth/user-not-found') {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGIN.NOT_FOUND'), 'danger');
                    } else {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
                    }
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe),
                finalize(() => {
                    this.loading = false;
                    this.cdr.markForCheck();
                })
            )
            .subscribe();
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.loginForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }


    loginWithFacebook() {
        this.loadingSocialFB = true;
        this.auth.fireAuth.doFacebookLogin()
            .pipe(
                tap(user => {
                    console.log({ user });

                    if (user) {
                        this.store.dispatch(new Login({ authToken: user.accessToken }));
                        this.router.navigateByUrl(this.returnUrl); // Main page
                    } else {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
                    }
                }),
                catchError((error, __) => {

                    if (get(error, 'error.error.code') === 'auth/user-not-found') {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGIN.NOT_FOUND'), 'danger');
                    } else {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
                    }
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe),
                finalize(() => {
                    this.loadingSocialFB = false;
                    this.cdr.markForCheck();
                })
            )
            .subscribe();
    }

    loginWithGoogle() {
        this.loadingSocialGoogle = true;
        this.auth.fireAuth.doGoogleLogin()
            .pipe(
                tap(user => {
                    console.log({user});

                    if (user) {
                        this.store.dispatch(new Login({authToken: user.accessToken}));
                        this.router.navigateByUrl(this.returnUrl); // Main page
                    } else {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
                    }
                }),
                catchError((error, __) => {

                    if (get(error, 'error.error.code') === 'auth/user-not-found') {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGIN.NOT_FOUND'), 'danger');
                    } else {
                        this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
                    }
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe),
                finalize(() => {
                    this.loadingSocialGoogle = false;
                    this.cdr.markForCheck();
                })
            )
            .subscribe();
    }
}
