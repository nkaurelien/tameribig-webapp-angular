import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {WavesModule, ButtonsModule, CardsModule, TabsModule, SmoothscrollModule} from 'ng-uikit-pro-standard';
import {FaqComponent} from './faq.component';
import { FaqModalComponent } from './modals/faq/faq-modal.component';

export const HOME_PAGE = ``;

const routes: Routes = [

  {
    path: HOME_PAGE,
    component: FaqComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    FaqComponent,
    FaqModalComponent,

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
    FaqModalComponent,
    RouterModule,
  ],
  providers: [
  ],
  entryComponents: [
        FaqModalComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class FaqModule { }

