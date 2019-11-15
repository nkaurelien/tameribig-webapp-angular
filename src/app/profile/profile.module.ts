import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule, InputUtilitiesModule, ToastModule, WavesModule} from 'ng-uikit-pro-standard';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

const routes: Routes = [
    {
        'path': '',
        'component': ProfileLayoutComponent,
        'children': [
            {
                'path': '',
                'component': ProfileComponent
            }
        ]
    }
];
@NgModule({imports: [
        CommonModule, RouterModule.forChild(routes),
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
        ProfileComponent,
        ProfileLayoutComponent
    ]})
export class ProfileModule  {



}
