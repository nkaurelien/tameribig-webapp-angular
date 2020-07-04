import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchLayoutComponent} from './pages/search-layout/search-layout.component';
import {SearchResultsComponent} from './pages/search-results/search-results.component';
import {SearchSharedModule} from './search-shared/search-shared.module';


@NgModule({
  declarations: [SearchLayoutComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchSharedModule,
  ],
  exports: [
    SearchSharedModule,
  ]
})
export class SearchModule {
}
