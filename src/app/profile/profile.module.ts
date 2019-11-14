import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { DefaultComponent } from '../default.component';
import {LayoutModule} from '../../layouts/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule, InputUtilitiesModule, ToastModule, WavesModule} from 'ng-uikit-pro-standard';

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': ProfileComponent
            }
        ]
    }
];
@NgModule({imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    InputsModule,
    InputUtilitiesModule,
    WavesModule,
    ToastModule.forRoot({
      positionClass: 'md-toast-bottom-center',
      maxOpened: 2,
    }),
  ], exports: [
        RouterModule
    ], declarations: [
        ProfileComponent
    ]})
export class ProfileModule  {



}
