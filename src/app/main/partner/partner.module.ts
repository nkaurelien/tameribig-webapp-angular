import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { IndexComponent } from './index/index.component';
import { CarouselModule } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [LayoutComponent, IndexComponent],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    CarouselModule,
  ]
})
export class PartnerModule { }
