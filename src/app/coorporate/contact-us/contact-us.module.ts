import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactUsComponent} from './contact-us.component';
import {CommonModule} from '@angular/common';
import {NewsLetterModule} from '../news-letter/news-letter.module';
import {
  ButtonsModule, CharCounterModule, IconsModule, InputsModule, InputUtilitiesModule, ModalModule,
  WavesModule,
  MDBModalService
} from 'ng-uikit-pro-standard';
import {ContactUsModalComponent} from './_modals/contact-us-modal.component';
import {ContactService} from '../_services/contact.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RecaptchaModule} from "ng-recaptcha";
// import {ContactUsModalComponent} from '../../../views/modals/contact/contact-us-modal.component';

export const HOME_PAGE = ``;

const routes: Routes = [

  {
    path: HOME_PAGE,
    component: ContactUsComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    ContactUsComponent,
    ContactUsModalComponent
  ],
  imports: [
    CommonModule,
    NewsLetterModule,
    WavesModule,
    ButtonsModule,
    ModalModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    CharCounterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,

    RouterModule.forChild(routes),
    ],
  exports: [
    RouterModule,

    NewsLetterModule,
    ContactUsModalComponent,
  ],
  providers: [
    MDBModalService,
    ContactService,
  ],
  entryComponents: [
    ContactUsModalComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactUsModule { }

