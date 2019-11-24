import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivacyPolicieComponent} from './privacyPolicie/privacypolicie.component';

// For MDB Angular Pro
// import {CarouselModule, WavesModule, ModalModule, InputsModule, ButtonsModule, AccordionModule} from 'ng-uikit-pro-standard';
import {CoorporateComponent} from './coorporate.component';
import {ContactService} from './_services/contact.service';
import {ButtonsModule, CarouselModule, IconsModule, PreloadersModule, WavesModule} from 'ng-uikit-pro-standard';
import {ScriptLoaderModule} from 'ngx-script-loader';
import { CooporateRoutingModule } from './coorporate-routing.module';


@NgModule({
    declarations: [
        CoorporateComponent,
        PrivacyPolicieComponent,
    ],
    imports: [
        CommonModule,
      CooporateRoutingModule,
        ScriptLoaderModule,
        // NewsLetterModule,
        CarouselModule,
        // AccordionModule,
        // ModalModule,
        IconsModule,
        WavesModule,
        PreloadersModule,

        // InputsModule,
        ButtonsModule,
      ],
    exports: [
        // ContactUsModalComponent,
    ],
    providers: [
        ContactService,
    ],
    entryComponents: [
        // ContactUsModalComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class CoorporateModule { }

