import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboadRoutingModule } from './user-dashboad-routing.module';
import { IndexComponent } from './index/index.component';
import { CardsModule, IconsModule } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    UserDashboadRoutingModule,
    CardsModule,
    IconsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],

})
export class UserDashboadModule { }
