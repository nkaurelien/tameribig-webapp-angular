import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {WavesModule, ButtonsModule, CardsModule, TabsModule, SmoothscrollModule} from 'ng-uikit-pro-standard';
import { AboutServicesComponent } from './about-services.component';

export const HOME_PAGE = ``;

const routes: Routes = [

  {
    path: HOME_PAGE,
    component: AboutServicesComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    AboutServicesComponent,
  ],
  imports: [
    CommonModule,
    WavesModule,
    ButtonsModule,
    TabsModule.forRoot(),
    CardsModule,
    SmoothscrollModule,
    RouterModule.forChild(routes)
    ],
  exports: [
    RouterModule,
  ],
  providers: [
  ],
  entryComponents: [
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutServicesModule { }

