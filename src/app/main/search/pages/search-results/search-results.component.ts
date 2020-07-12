import {Component, OnInit} from '@angular/core';
import {MediasSearchApiService} from '@app/main/@core/services/medias-search-api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  images$: Observable<any>;

  constructor(
    private mediasSearchApiService: MediasSearchApiService,
  ) {
    console.log(this.mediasSearchApiService)
    this.images$ = this.mediasSearchApiService.query.selectImages$;

  }

  ngOnInit() {
    this.images$.subscribe(searchResults => {
      console.log({searchResults});
    });
  }

}
