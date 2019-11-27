import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import {
    ButtonsModule,
    CardsModule, CharCounterModule, CheckboxModule,
    IconsModule,
    InputsModule,
    InputUtilitiesModule,
    ModalModule,
    SelectModule, WavesModule
} from 'ng-uikit-pro-standard';
import { ImageAddComponent } from './image-add/image-add.component';
import {ImagesRoutingModule} from './images-routing.module';
import {environment} from '@environments/environment';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {ImagesService} from '@app/main/@core/services/images.service';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: `${environment.ApiBaseUrl}/images/uploadHandler`,
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    addRemoveLinks: true,
};

@NgModule({
    declarations: [ImageComponent, ImageAddComponent],
    imports: [
        CommonModule,
        ImagesRoutingModule,
        CardsModule,
        IconsModule,
        ButtonsModule,
        SelectModule,
        ModalModule,
        DropzoneModule,
        InputsModule,
        InputUtilitiesModule,
        WavesModule,
        FormsModule,
        CheckboxModule,
        CharCounterModule,
        ReactiveFormsModule,
        TagInputModule,
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        ImagesService,
        ImagesApiService,
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ]
})
export class ImagesModule { }

