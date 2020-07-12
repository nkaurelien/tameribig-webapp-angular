import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchLayoutComponent} from './pages/search-layout/search-layout.component';
import {SearchResultsComponent} from './pages/search-results/search-results.component';
import {SearchSharedModule} from './search-shared/search-shared.module';
import {MediasSearchApiService} from '@app/main/@core/services/medias-search-api.service';
import {SearchResultsDotComponent} from './pages/search-results/search-results-dot.component';
import {SearchResultsMasonryComponent} from './pages/search-results/search-results-masonry.component';


@NgModule({
  declarations: [SearchLayoutComponent, SearchResultsComponent, SearchResultsDotComponent, SearchResultsMasonryComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchSharedModule,
  ],
  exports: [
    SearchSharedModule,
  ],
  providers: [
    MediasSearchApiService,
  ]
})
export class SearchModule {
}
