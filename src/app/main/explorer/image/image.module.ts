import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ImagePresenterComponent} from './imagepresenter.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {NgxMasonryModule} from 'ngx-masonry';
import {SlideshowModule} from 'ng-simple-slideshow';
import { WavesModule, AccordionModule, ButtonsModule, InputsModule, CheckboxModule } from 'ng-uikit-pro-standard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ShareButtonsModule} from '@ngx-share/buttons';
import { ImagesService } from '../../@core/services/images.service';
import {HttpClientModule} from "@angular/common/http";



const routes: Routes = [
    {
        'path': ':uid',
        'component': ImagePresenterComponent
    }
];
@NgModule({

    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        // HttpClientModule,
        CheckboxModule,
        InputsModule,
        ButtonsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SlideshowModule,
        LazyLoadImageModule,
        NgxMasonryModule,
        AccordionModule, WavesModule,
        ShareButtonsModule
    ], exports: [
        RouterModule
    ], declarations: [
        ImagePresenterComponent
    ],
    providers: [
        // ImagesService,
    ]
})
export class ImageModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ImageModule,
            providers: [
                ImagesService,
            ]
        };
    }
}
