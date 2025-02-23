import {Injectable} from '@angular/core';
import {catchError, map, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EMPTY, forkJoin, Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';
import {IApiResource} from '@core/_base/crud/models/IApiResource';
import {Router} from '@angular/router';
import {uniqBy} from 'lodash';
import {AuthService} from '@core/auth';
import {ImagesStore} from '@app/main/@core/state/image/images.store';
import {ImagesQuery} from '@app/main/@core/state/image/images.query';
import {SearchResponseItem} from '@app/main/search/models/SearchResponseItem';
import {SearchQuery} from '@app/main/search/states/search.query';
import {SearchStore} from '@app/main/search/states/search.store';
import {SearchSuggestionResponseItem} from '@app/main/search/models/SearchSuggestionResponseItem';
import {SearchSuggestion} from '@app/main/search/models/SearchSuggestion';


@Injectable({
  providedIn: 'root',
})
export class MediasSearchApiService {


  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private imagesStore: ImagesStore,
    private searchStore: SearchStore,
    private imagesQuery: ImagesQuery,
    private searchQuery: SearchQuery,
    private router: Router,
  ) {

  }

  get query() {
    return this.searchQuery;
  }

  get store() {
    return this.searchStore;
  }


  searchSelectedTab(searchTerm: SearchSuggestionQuery, paramActiveSearchTab): Observable<any> {

    let stream: Observable<any> = EMPTY;
    switch (paramActiveSearchTab) {
      case ActiveTab.CREATIONS:
        stream = this.searchCreations(searchTerm);
        break;
      case ActiveTab.IMAGES:
        stream = this.searchImages(searchTerm);
        break;
      default:
        stream = this.searchImages(searchTerm);
    }

    return stream.pipe(
      // finalize(() => {
      //   this.store.setLoading(false);
      // })
    );
  }

  searchMedia(terms: string[]): Observable<any> {

    const streams = [this.searchImages({search: terms})];
    // const streams = {
    //     images: this.searchImages(terms),
    // };
    return forkJoin(streams).pipe(
      map((values => {

        const [images] = values;
        // values  =  flattenDeep(values );
        // console.log('results', arr );
        // values =  uniqBy(values , 'uid');
        // console.log('results sss', arr )

        return {images};
      })),
      tap(x => console.log('results', x)),

      // catchError(x => x)
    );
  }

  searchImages(terms: SearchSuggestionQuery): Observable<SearchResponseItem[]> {
    return this.http.post<IApiResource>(environment.ApiBaseUrl + '/search/images', terms).pipe(
      take(1),
      map(resp => (resp.data || resp)),
      // tap(resp => this.searchStore.update(state => ({images: resp}))),
      tap(resp => this.searchStore.update({images: resp})),
      catchError((err, x) => {
        this.searchStore.setError(err);
        return throwError(err);
      }),
    );
  }

  searchCreations(terms: SearchSuggestionQuery): Observable<SearchResponseItem[]> {
    return this.http.post<IApiResource>(environment.ApiBaseUrl + '/search/creations', terms).pipe(
      take(1),
      map(resp => (resp.data || resp)),
      // tap(resp => this.searchStore.update(state => ({images: resp}))),
      tap(resp => this.searchStore.update({images: resp})),
      catchError((err, x) => {
        this.searchStore.setError(err);
        return throwError(err);
      })
    );
  }

  searchSuggestions(terms: SearchSuggestionQuery): Observable<SearchSuggestion[]> {
    return this.http.post<IApiResource>(environment.ApiBaseUrl + '/search/suggestions', terms).pipe(
      take(1),
      map(resp => (resp.data || resp) as SearchSuggestionResponseItem),
      map(resp => (resp.native || resp) as SearchSuggestion[]),
      map(resp => uniqBy(resp, 'searchMd5')),
      // tap(console.log),
      tap(resp => this.searchStore.update({suggestions: resp})),
      catchError((err, x) => {
        this.searchStore.setError(err);
        return throwError(err);
      })
    );
  }

}


interface SearchSuggestionQuery {
  _id?: string;
  search: string | string[];
}


export enum ActiveTab {
  IMAGES = 'images',
  AUDIOS = 'audios',
  VIDEOS = 'videos',
  CREATIONS = 'creations'
}
