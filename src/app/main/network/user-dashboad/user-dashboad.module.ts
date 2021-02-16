import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserDashboadRoutingModule} from './user-dashboad-routing.module';
import {IndexComponent} from './index/index.component';
import {BadgeModule, ButtonsModule, CardsModule, IconsModule, WavesModule} from 'ng-uikit-pro-standard';
import {LazyLoadImageModule} from 'ng-lazyload-image';


@NgModule({
    declarations: [IndexComponent],
    imports: [
        CommonModule,
        UserDashboadRoutingModule,
        CardsModule,
        IconsModule,
        ButtonsModule,
        LazyLoadImageModule,
        BadgeModule,
        WavesModule,
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],

})
export class UserDashboadModule {
}
