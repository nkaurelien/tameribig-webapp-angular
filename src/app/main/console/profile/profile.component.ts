import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ToastService} from 'ng-uikit-pro-standard';
import {User} from '@app/auth2/_models';
import {AuthenticationService} from '@app/auth2/_services';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  profilForm: FormGroup;
  authUser: User;
  errors: string[] = [];
  private isLoggedInSubscription: Subscription;
  defaultImageAvatar = '/assets/images/icons/masque-afrique.jpg';

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private toast: ToastService
  )  {

    this.authUser = new User();

    this.subscribeLoginState();

  }
  ngOnInit()  {
    this.createForm();
  }

  subscribeLoginState() {
    this.isLoggedInSubscription = this.auth.isLoggedIn$.subscribe(({ loggedIn, user, routerState }) => {
      // console.log('routerState', routerState, 'user' , user, '_loggedIn', loggedIn);
      if (loggedIn && user) {
        this.authUser.init(user);
      } else {
        this.authUser = new User();
      }

    });
  }

  createForm() {
    this.profilForm = new FormGroup({
      fullName: new FormControl(this.authUser.fullName, [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl(this.authUser.firstName, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.authUser.lastName, [Validators.required, Validators.minLength(3)]),
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
      this.auth.updateUserData(this.profilForm.value);
    } else {
      this.errors = ['Formulaire invalide'];
      const options = { positionClass: 'md-toast-bottom-full-width' };
      this.toast.info('Verifier votre formulaire', '', options);
    }
  }
}
