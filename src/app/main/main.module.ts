import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MainLayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavigationModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'AIzaSyCb44fZMVNTqsA7phK5chbOolMgsJl9mFw'
    }),
  ],
  exports: [
    FooterComponent,
  ],
})
export class MainModule { }
