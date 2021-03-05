import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ImagePresenterComponent} from './_id/imagepresenter.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {NgxMasonryModule} from 'ngx-masonry';
import {
  AccordionModule,
  ButtonsModule,
  CheckboxModule,
  IconsModule,
  InputsModule,
  ModalModule,
  PreloadersModule,
  WavesModule
} from 'ng-uikit-pro-standard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImagesService} from '../../@core/services/images.service';
import {AnimatedLikeModule} from '@core/components/animated-like/animated-like.module';
import {AvatarModule} from 'ngx-avatar';
import {ShareButtonsModule} from "ngx-sharebuttons/buttons";
// import {ShareIconsModule} from "ngx-sharebuttons/icons";


const routes: Routes = [
    {
        path: ':uid',
        component: ImagePresenterComponent
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
        IconsModule,
        ButtonsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LazyLoadImageModule,
        NgxMasonryModule,
        AvatarModule,
        AccordionModule, WavesModule,
        ModalModule, PreloadersModule,
        ShareButtonsModule,
        AnimatedLikeModule,
        // ShareIconsModule,
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
  static forRoot(): ModuleWithProviders<ImageModule> {
    return {
      ngModule: ImageModule,
      providers: [
        ImagesService,
      ]
    };
  }
}
