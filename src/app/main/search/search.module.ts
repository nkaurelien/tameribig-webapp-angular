import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchLayoutComponent} from './pages/search-layout/search-layout.component';
import {SearchResultsComponent} from './pages/search-results/search-results.component';
import {SearchSharedModule} from './shared/search-shared.module';
import {MediasSearchApiService} from '@app/main/@core/services/medias-search-api.service';
import {SearchResultsDotComponent} from './pages/search-results/search-results-dot.component';
import {SearchResultsMasonryComponent} from './pages/search-results/search-results-masonry.component';
import {SearchResultsGrid1Component} from './pages/search-results/search-results-grid-1.component';
import {SearchResultsImageCard1Component} from './pages/search-results/search-results-image-card-1.component';


@NgModule({
  declarations: [SearchLayoutComponent, SearchResultsComponent, SearchResultsDotComponent, SearchResultsMasonryComponent, SearchResultsGrid1Component, SearchResultsImageCard1Component],
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
