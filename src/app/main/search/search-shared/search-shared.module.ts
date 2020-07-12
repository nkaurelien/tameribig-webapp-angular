import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearcherComponent} from './searcher/searcher.component';
import {Searcher2Component} from './searcher-2/searcher2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {AutoCompleterModule, IconsModule, InputsModule, TooltipModule} from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    SearcherComponent,
    Searcher2Component,
  ],
  exports: [
    SearcherComponent,
    Searcher2Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    RouterModule,
    NgbTypeaheadModule,
    IconsModule,
    InputsModule,
    AutoCompleterModule,
  ]
})
export class SearchSharedModule {
}
