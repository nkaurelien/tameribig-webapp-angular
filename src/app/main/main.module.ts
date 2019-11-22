import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { NavigationModule } from './main-layout/navigation/navigation.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavigationModule,
  ],
  exports: [
    FooterComponent,
  ],
})
export class MainModule { }
