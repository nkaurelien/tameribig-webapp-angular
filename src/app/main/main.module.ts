import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { AgmCoreModule } from '@agm/core';
import { GMAP_API_KEY } from '@environments/environment';
import {CoreModule} from '@core/core.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    // CoreModule.forRoot(),
    MainRoutingModule,
    NavigationModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: GMAP_API_KEY
    }),
  ],
  exports: [
    FooterComponent,
  ],
})
export class MainModule { }
