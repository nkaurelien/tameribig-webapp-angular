import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {IApiResource} from '@core/_base/crud/models/IApiResource';
import {Router} from '@angular/router';
import {AuthService} from '@core/auth';
import {ImagesStore} from '@app/main/@core/state/image/images.store';
import {ImagesQuery} from '@app/main/@core/state/image/images.query';
import {SearchResponseItem} from "@app/main/home/searcher/SearchResponseItem";


@Injectable({
  providedIn: 'root',
})
export class MediasSearchApiService {


  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private imagesStore: ImagesStore,
    private imagesQuery: ImagesQuery,
    private router: Router,
  ) {

  }

  get query() {
    return this.imagesQuery;
  }

  get store() {
    return this.imagesStore;
  }


  searchMedia(terms: string[]): Observable<any> {

    const streams = [this.searchImages(terms)];
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

  searchImages(terms: string[]): Observable<SearchResponseItem[]> {
    return this.http.post<IApiResource>(environment.ApiBaseUrl + '/images/search', terms).pipe(
      take(1),
      map(resp => (resp.data || resp)),
      // tap(resp => this.imagesStore.upsert(resp._id, resp)),
    );
  }


}
