import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NewsLetterService } from './news-letter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit, AfterViewInit {

  siteKey;
  size;
  theme: 'ligth' | 'dark' | string;
  type: 'image' | 'audio' | string;
  lang;
  badge: 'bottomright' | 'bottomleft' | 'inline' | string;
  model: any | { email: string } = {};
  error: string;
  success: string;
  loading = false;
  newsletterSubForm: FormGroup;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;

  @ViewChild('newsletterSubFormRef', {static: false}) newsletterSubFormRef: any;

  /**
   * @example https://enngage.github.io/ngx-captcha/invisible
   */
  @ViewChild('captchaElem', { static: false}) captchaElem: any;


  constructor(
    private newsLetterService: NewsLetterService,
    public _formbuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {

    this.siteKey = environment.googleRecaptcha.siteKey;
    this.size = environment.googleRecaptcha.size;
    this.badge = environment.googleRecaptcha.badge;
    this.lang = environment.googleRecaptcha.hl;
    this.theme = environment.googleRecaptcha.theme;
    this.type = environment.googleRecaptcha.type;

  }

  ngOnInit() {
    this.__createFormValidation();
  }

  ngAfterViewInit(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
  }

  /**
 *
   * Gerer la validation des formulaire
   */
  private __createFormValidation() {
    this.newsletterSubForm = this._formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
    // recaptcha: [null, [/*Validators.required*/]],
    });
  }

  get emailInput() {
    return this.newsletterSubForm.get('email');
  }
  get recaptchaInput() {
    return this.newsletterSubForm.get('recaptcha');
  }

  get canRecaptcha() {
    return this.captchaIsLoaded;
  }

  get recaptchaIsCorrect() {

    // console.log('this.captchaIsLoaded', this.captchaIsLoaded);

    // console.log('this.captchaSuccess', this.captchaSuccess);

    return  this.captchaSuccess;
  }


  submitRegistration() {
    // console.log(this.senderform.getRawValue());
    this.newsletterSubFormRef.ngSubmit.emit();
  }


  execute(): void {
    this.captchaElem.execute();
  }


  register(captchaResponse = null) {

    const email = this.emailInput.value;

    const recaptcha = captchaResponse || this.captchaResponse || this.recaptchaInput.value ;

    // console.log('email', email);

    // console.log('recaptcha', recaptcha);

    // console.log('this.newsletterSubForm.valid', this.newsletterSubForm.valid);


    // console.log('this.recaptchaIsCorrect', this.recaptchaIsCorrect);


    if (this.newsletterSubForm.valid && this.recaptchaIsCorrect) {


      this.loading = true;
      this.newsLetterService.register({ email, 'g-recaptcha-response': recaptcha }).subscribe((response) => {
        // console.log('response', response);
        this.error = null;
        this.success = 'Vous etes desormais inscris à notre Newsletter'
      }, (error) => {
        this.success = null;
        this.error = 'Votre abonnement ne s\'est pas bien passé';
      }, () => {
          this.loading = null;
        this.reset();
      });
    }
  }



  handleLoad() {
    // console.log('Recaptcha loaded');
      this.captchaIsLoaded = true;
  }

  handleSuccess(captchaResponse: string) {
    this.captchaSuccess = true;
    this.error = null;

    this.captchaResponse = captchaResponse;

    if ( this.captchaIsReady) {
      this.register(captchaResponse);
    } else {
      setTimeout(() => {
        this.register(captchaResponse);
      }, 2000);
    }
    // console.log('Recaptcha response success', captchaResponse);
  }

  handleReset() {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
  }

  handleReady() {
    this.captchaIsReady = true;
  }

  handleExpire() {
      this.error = 'Vous n\'avez pas reussi le test du Captcha';

  }

  handleEmailHaveFocus() {
    // console.log('handleEmailHaveFocus');
  }

  handleEmailLostFocus() {
    // console.log('handleEmailLostFocus');
  }


  reload(): void {
    this.captchaElem.reloadCaptcha();
  }

  getCaptchaId(): void {
    // alert(this.captchaElem.getCaptchaId());
  }

  reset(): void {
    // this.captchaElem.resetCaptcha();
    this.newsletterSubForm.reset();
    this.captchaElem.reset();
  }

  getCurrentResponse(): void {
    const currentResponse = this.captchaElem.getCurrentResponse();
    if (!currentResponse) {
      // alert('There is no current response - have you submitted captcha?');
    } else {
      // alert(currentResponse);
    }
  }

  getResponse(): void {
    const response = this.captchaElem.getResponse();
    if (!response) {
      // alert(`There is no response from grecaptcha script - try using 'getCurrentResponse' method or subscribe to 'success' event`);
    } else {
      // alert(response);
    }
  }
}
