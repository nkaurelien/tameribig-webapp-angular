import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageComponent} from './image.component';
import {
    ButtonsModule,
    CardsModule, CharCounterModule, CheckboxModule, DropdownModule,
    IconsModule,
    InputsModule,
    InputUtilitiesModule,
    ModalModule, PreloadersModule,
    SelectModule, TooltipModule, WavesModule
} from 'ng-uikit-pro-standard';
import {ImageAddComponent} from './image-add/image-add.component';
import {ImagesRoutingModule} from './images-routing.module';
import {cloudinaryConfig, environment} from '@environments/environment';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {ImagesService} from '@app/main/@core/services/images.service';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';
import {ImageUploadSourceComponent} from './image-upload-source/image-upload-source.component';
import {ImageUploadPictureComponent} from './image-upload-picture/image-upload-picture.component';
import {ImageEditComponent} from './image-edit/image-edit.component';
import {SearchSelectablePipe} from './search-selectable.pipe';
import {ImageUploadComponent} from './image-upload/image-upload.component';

// import filepond module
import {FilePondModule, registerPlugin} from 'ngx-filepond';

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import {CloudinaryConfiguration, CloudinaryModule} from "@cloudinary/angular-5.x";
import {Cloudinary} from "cloudinary-core";
import {CoreModule} from "@core/core.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "@core/services/token-interceptor.service";

registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageValidateSize);


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: `${environment.ApiBaseUrl}/images/upload-picture`,
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    addRemoveLinks: true,
};

@NgModule({
    declarations: [ImageComponent, ImageAddComponent, ImageUploadComponent, ImageUploadSourceComponent, ImageUploadPictureComponent, ImageEditComponent, SearchSelectablePipe],
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
        FilePondModule,
        // CoreModule.forRoot(),


        // CloudinaryModule.forRoot({Cloudinary}, cloudinaryConfig as CloudinaryConfiguration),

    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        ImagesService,
        ImagesApiService,

        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TokenInterceptorService,
        //     multi: true,
        // },
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ]
})
export class ImagesModule {
}

