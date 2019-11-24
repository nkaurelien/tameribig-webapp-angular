import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsLetterComponent } from './news-letter.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxCaptchaModule,
    RecaptchaModule,
  ],
  declarations: [NewsLetterComponent],
  exports: [NewsLetterComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class NewsLetterModule { }
