import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediasSearchApiService} from '@app/main/@core/services/medias-search-api.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  images$: Observable<any>;

  private unsubscribe = new Subject();

  constructor(
    private mediasSearchApiService: MediasSearchApiService,
    private route: ActivatedRoute,
  ) {
    this.images$ = this.mediasSearchApiService.query.selectImages$;

  }

  ngOnInit() {
    // this.images$.subscribe(searchResults => {
    //   console.log({searchResults});
    // });

    // console.log('this.route.firstChild', this.route.firstChild);


    combineLatest(
      this.route.queryParams,
      this.route.params
    )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        ([queryParams, params]: any) => {
          if (queryParams.hasOwnProperty('q') && params.hasOwnProperty('active_search_tab')) {
            const searchTerm = queryParams.q || '';
            const paramActiveSearchTab = params.active_search_tab;
            this.mediasSearchApiService.store.setLoading(true);
            this.mediasSearchApiService.searchSelectedTab({search: searchTerm}, paramActiveSearchTab).pipe(
              takeUntil(this.unsubscribe),
              finalize(() => this.mediasSearchApiService.store.setLoading(false)),
            ).subscribe();
          }

          // console.log('new', {queryParams, params});
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
