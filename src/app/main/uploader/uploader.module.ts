import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { FlexLayoutModule } from '@angular/flex-layout';

import { DropzoneModule, DropzoneConfigInterface,
    DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import {UploaderComponent} from './uploader.component';
import {environment} from '@environments/environment';
import {ButtonsModule, CharCounterModule, InputsModule, InputUtilitiesModule, ToastModule, WavesModule} from 'ng-uikit-pro-standard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TagInputModule } from 'ngx-chips';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { ImagesService } from '../@core/services/images.service';


const routes: Routes = [
    {
        'path': '',
        'component': MainLayoutComponent,
        'children': [
            {
                'path': '',
                'component': UploaderComponent
            }
        ]
    }
];

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: `${environment.ApiBaseUrl}/images/uploadHandler`,
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    addRemoveLinks: true,
};


@NgModule({

    // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DropzoneModule,
        ButtonsModule,
        InputsModule,
        InputUtilitiesModule,
        WavesModule,
        FormsModule,
        CharCounterModule,
        ReactiveFormsModule,
        TagInputModule,
        // BrowserAnimationsModule,
        // ToastModule.forRoot({
        //     positionClass: 'md-toast-bottom-center',
        //     maxOpened: 2,
        // }),


        // FlexLayoutModule,
    ], exports: [
        RouterModule
    ], declarations: [
        UploaderComponent
    ],
    providers: [
        ImagesService,
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ]
})
export class UploaderModule  {
    //
}
