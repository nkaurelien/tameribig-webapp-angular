import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {IApiResource} from '@core/_base/crud/models/IApiResource';
import {Router} from '@angular/router';
import {AuthService} from '@core/auth';
import {Image} from '@app/main/@core/state/image/image.model';
import {ImagesStore} from '@app/main/@core/state/image/images.store';
import {ImagesQuery} from '@app/main/@core/state/image/images.query';


@Injectable({
  providedIn: 'root',
})
export class ImagesApiService {


  constructor(
    private http: HttpClient,
        private auth: AuthService,
        private imagesStore: ImagesStore,
        private imagesQuery: ImagesQuery,
        private router: Router,
    ) {

    }

    static getImageUrl(image: Image) {
        return `${environment.ApiBaseUrl}/images/open/${image.uid}`;
    }

    get query() {
        return this.imagesQuery;
    }

    get store() {
        return this.imagesStore;
    }

    getAll(): Observable<Image[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images').pipe(
            take(1),
            map(resp => (resp.data || resp)),
            tap(resp => this.imagesStore.set(resp))
        );
    }


    findOneById(ID: string): Observable<Image | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/' + ID).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image),
            // tap(resp => this.imagesStore.upsert(resp._id, resp)),
            tap(resp => this.imagesStore.setActive(resp._id))
        );
    }


    createImageDownloadZipUrl(ID: string): Observable<Image | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/download-picture-archive').pipe(
            take(1),
            map(resp => (resp.data || resp) as string),
        );
    }

    voteUpById(ID: string): Observable<Image | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/vote-up', this.auth.apiAuth.jwtHttpHeaders()).pipe(
            map(resp => (resp.data || resp) as Image)
        );
    }


    voteDownById(ID: string): Observable<Image | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/vote-down', this.auth.apiAuth.jwtHttpHeaders()).pipe(
            map(resp => (resp.data || resp) as Image)
        );
    }


    create(body: Partial<Image>): Observable<Image | any> {
        return this.http.post<IApiResource>(environment.ApiBaseUrl + '/images', body, this.auth.apiAuth.jwtHttpHeaders()).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image),
            tap(resp => this.imagesStore.upsert(resp._id, resp)),
        );
    }


    updateOneById(ID: string, body: Partial<Image>): Observable<Image | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/images/' + ID, body, this.auth.apiAuth.jwtHttpHeaders()).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image),
            tap(resp => this.imagesStore.update(resp._id, resp))
        );
    }

    publishOneById(ID: string): Observable<Image | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/publish', null, this.auth.apiAuth.jwtHttpHeaders()).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image),
            tap(resp => this.imagesStore.update(resp._id, resp))
        );
    }

    unpublishOneById(ID: string): Observable<Image | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/unpublish', null, this.auth.apiAuth.jwtHttpHeaders()).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image),
            tap(resp => this.imagesStore.update(resp._id, resp))
        );
    }


    getAllByAuth(): Observable<Image[] | any> {

        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/me', this.auth.apiAuth.jwtHttpHeaders()).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image));
    }

    navigateToImage(id: string) {
        console.log(id);
        this.imagesStore.setActive(id);
        this.router.navigate(['/explorer/images/', id]);

    }
}
