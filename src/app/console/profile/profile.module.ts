import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule, InputUtilitiesModule, WavesModule, CardsModule, IconsModule, AccordionModule, TabsModule} from 'ng-uikit-pro-standard';
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
        CommonModule, 
        RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    InputUtilitiesModule,
    ButtonsModule,
    WavesModule,
    CardsModule,
    IconsModule,
    AccordionModule,
    TabsModule,
  ], exports: [
        RouterModule
    ], declarations: [
        ProfileComponent,
        ProfileLayoutComponent
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule  {



}
