// Angular
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// RxJS
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
// Translate
import {TranslateService} from '@ngx-translate/core';
// Auth
import {AuthNoticeService} from '../../auth-notice/auth-notice.service';
import {AuthService} from '../../_services';
import {environment} from "@environments/environment";
import {RecaptchaLoaderService} from "ng-recaptcha";

@Component({
    selector: 'kt-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [RecaptchaLoaderService],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    @ViewChild('captchaElem', {static: false}) captchaElem: any;
    @ViewChild('formRef', {static: false}) formRef: any;
    // Public params
    forgotPasswordForm: FormGroup;
    loading = false;
    email: string = '';
    errors: any = [];
    siteKey: string;
    size: string;
    public captchaIsLoaded = false;
    public captchaSuccess = false;
    public captchaResponse?: string;
    public captchaIsReady = false;


    private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    /**
     * Component constructor
     *
     * @param authService
     * @param authNoticeService
     * @param translate
     * @param router
     * @param route
     * @param fb
     * @param cdr
     */
    constructor(
        private authService: AuthService,
        public authNoticeService: AuthNoticeService,
        private translate: TranslateService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this.unsubscribe = new Subject();

        this.siteKey = environment.googleRecaptcha.siteKey;
        this.size = environment.googleRecaptcha.size;
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit() {
        this.email = this.route.snapshot.queryParamMap.get('email');
        this.initRegistrationForm();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.loading = false;
    }

    /**
     * Form initalization
     * Default params, validators
     */
    initRegistrationForm() {
        this.forgotPasswordForm = this.fb.group({
            email: [this.email, Validators.compose([
                Validators.required,
                Validators.email,
                Validators.minLength(3),
                Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ])
            ]
        });
    }


    handleSuccess(captchaResponse: string) {
        this.captchaSuccess = true;
        this.errors = [];

        this.captchaResponse = captchaResponse;

        if (this.captchaIsReady) {
            this.submit();
        } else {
            setTimeout(() => {
                this.submit();
            }, 2500);
        }
        // console.log('Recaptcha response success', captchaResponse);
    }

    executeCaptcha(): void {
        this.captchaElem.execute();
    }

    /**
     * Form Submit
     */
    submit() {

        const controls = this.forgotPasswordForm.controls;
        /** check form */
        if (this.forgotPasswordForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.loading = true;

        const email = controls['email'].value;
        this.authService.requestPassword(email).pipe(
            tap(response => {
                if (response) {
                    this.authNoticeService.setNotice(this.translate.instant('AUTH.FORGOT.SUCCESS'), 'success');
                    this.router.navigateByUrl('/auth/login');
                } else {
                    this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND', {name: this.translate.instant('AUTH.INPUT.EMAIL')}), 'danger');
                }
            }),
            takeUntil(this.unsubscribe),
            finalize(() => {
                this.loading = false;
                this.cdr.markForCheck();
            })
        ).subscribe();
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.forgotPasswordForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }
}
