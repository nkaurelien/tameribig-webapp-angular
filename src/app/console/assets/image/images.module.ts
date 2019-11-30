import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import {
    ButtonsModule,
    CardsModule, CharCounterModule, CheckboxModule, DropdownModule,
    IconsModule,
    InputsModule,
    InputUtilitiesModule,
    ModalModule, PreloadersModule,
    SelectModule, TooltipModule, WavesModule
} from 'ng-uikit-pro-standard';
import { ImageAddComponent } from './image-add/image-add.component';
import {ImagesRoutingModule} from './images-routing.module';
import {environment} from '@environments/environment';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {ImagesService} from '@app/main/@core/services/images.service';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';
import {ImageUploadSourceComponent} from './image-upload-source/image-upload-source.component';
import {ImageUploadPictureComponent} from './image-upload-picture/image-upload-picture.component';
import {ImageEditComponent} from './image-edit/image-edit.component';
import {SearchSelectablePipe} from './search-selectable.pipe';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: `${environment.ApiBaseUrl}/images/upload-picture`,
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    addRemoveLinks: true,
};

@NgModule({
    declarations: [ImageComponent, ImageAddComponent, ImageUploadSourceComponent, ImageUploadPictureComponent, ImageEditComponent, SearchSelectablePipe],
    imports: [
        CommonModule,
        ImagesRoutingModule,
        CardsModule,
        IconsModule,
        ButtonsModule,
        SelectModule,
        ModalModule,
        PreloadersModule,
        DropzoneModule,
        DropdownModule,
        InputsModule,
        CheckboxModule,
        TooltipModule,
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

