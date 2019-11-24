import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {ButtonsModule, CardsModule, CheckboxModule, FileInputModule, InputsModule, SelectModule, WavesModule} from 'ng-uikit-pro-standard';
import {RecrutmentComponent} from './recrutment.component';
import {RecrutmentService} from '../_services/recrutment.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

export const HOME_PAGE = ``;

const routes: Routes = [

  {
    path: HOME_PAGE,
    component: RecrutmentComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    RecrutmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    WavesModule,
    ButtonsModule,
    CardsModule,
    InputsModule,
    FileInputModule,
    CheckboxModule,
    SelectModule,
    HttpClientModule,
    RouterModule.forChild(routes)
    ],
  exports: [
    RouterModule,
  ],
  providers: [
    RecrutmentService,
  ],
  entryComponents: [
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class RecrutmentModule { }

