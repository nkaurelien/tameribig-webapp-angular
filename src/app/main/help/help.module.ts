import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { CardsModule, AccordionModule, CollapseModule } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [HelpComponent,],
  imports: [
    CommonModule,
    HelpRoutingModule,
    CardsModule,
    CollapseModule,
    AccordionModule,
    
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class HelpModule { }
