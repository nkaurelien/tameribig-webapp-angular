

declare function require(path: string);

import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {environment} from '@environments/environment';
import {MDBModalRef, ToastService} from 'ng-uikit-pro-standard';
import {ContactService} from '../../_services/contact.service';
import {RecaptchaLoaderService} from "ng-recaptcha";


@Component({
    selector: 'app-contact-us-modal',
    templateUrl: './contact-us-modal.component.html' ,
    styles: [``],
    providers: [RecaptchaLoaderService],
})


export class ContactUsModalComponent implements OnInit, AfterViewInit {

  @ViewChild('captchaElem', {static: false}) captchaElem: any;

  @ViewChild('formRef', {static: false}) formRef: any;

  logo = environment.logo;

  errors = [];

  siteKey;

  size;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;

  motifLength = 190;

  contactform: FormGroup;

    constructor(
        public modalRef: MDBModalRef,
        private contactservice: ContactService,
        private formbuilder: FormBuilder,
        private toastr: ToastService,
        private cdr: ChangeDetectorRef,

    ) {

      this.siteKey = environment.googleRecaptcha.siteKey;
      this.size = environment.googleRecaptcha.size;
    }


  createForm() {
    this.contactform = this.formbuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      objet:    ['', Validators.required],
      motif:    ['', [Validators.required, Validators.maxLength(this.motifLength)]]

    });
  }


    ngOnInit() {
      this.createForm();

    }

  ngAfterViewInit(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
  }


  sendMessage() {
    if (this.contactform.valid) {
      this.errors[0] = [];
      this.contactservice.contactAdmin(this.contactform.value).subscribe(res => {
        // this.userMsg = res.data;
        // console.log(this.userMsg);

        this.contactform.reset();
        this.modalRef.hide();
        this.toastr.success('Message envoyé avec success', 'success!', {
          timeOut: 25000,
          positionClass: 'md-toast-top-middle'
          // closeButton: true,
        });

      }, error => this.errors[0] = 'Message non envoyé par courrier');

    } else {
      console.log({formError : this.contactform.get('motif').errors})
      this.toastr.warning('Remplissez correctement le formulaire', '', {
        timeOut: 25000,
        // closeButton: true,
      });

    }
  }

  sendWhatsappMessage () {
      if (this.contactform.valid) {
        this.errors[0] = [];
        this.contactservice.sendWhatsappMessage(this.contactform.value).then(res => {
          // this.userMsg = res.data;
          // console.log(this.userMsg);

          this.contactform.reset();
          this.modalRef.hide();
          this.toastr.success('Message envoyé a whatsapp', 'success!', {
            timeOut: 25000,
            // closeButton: true,
          });

        }, error => this.errors[0] = 'Message non envoyé a whatsapp');

      } else {
        this.toastr.warning('Remplissez correctement le formulaire', '', {
          timeOut: 25000,
          // closeButton: true,
        });

      }

    // this.router.navigate(['/']);
  }


  handleSuccess(captchaResponse: string) {
    this.captchaSuccess = true;
    this.errors = [];

    this.captchaResponse = captchaResponse;

    if ( this.captchaIsReady) {
      this.sendMessage();
    } else {
      setTimeout(() => {
        this.sendMessage();
      }, 2000);
    }
    // console.log('Recaptcha response success', captchaResponse);
  }


  execute(): void {
    this.captchaElem.execute();
  }


}
