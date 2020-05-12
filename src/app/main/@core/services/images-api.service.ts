import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {AuthenticationService} from '@app/auth2/_services';
import {IApiResource} from '@core/_base/crud/models/IApiResource';
import {Router} from '@angular/router';


export interface Author {
    fullname: string;
    displayName: string;
    email?: string;
    social?: string;
    avatar?: string;
    uid?: string;
}

export interface ImageSize {
    size: string;
    downloadUrl: string;
}

export interface Image {
    _id: string;
    uid: string;
    picture: string;
    miniature: string;
    title: string;
    description: string;
    content: any;
    price: number;
    author: Author;
    userId: number;
    createdAt?: string;
    publishedAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    upvote?: number;

    keywords?: string[];
    // tags?: string[];
    topics?: any[];
    comments?: any[];
    size?: {
        xs?: ImageSize,
        sm?: ImageSize,
        md?: ImageSize,
        lg?: ImageSize,
        xl?: ImageSize,

    };
}

@Injectable({
    providedIn: 'root',
})
export class ImagesApiService {


    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private router: Router,
    ) {

    }


    getAll(): Observable<Image[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/').pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }


    findOneById(ID: string): Observable<Image | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/' + ID).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }

    voteUpById(ID: string): Observable<Image | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/vote-up').pipe(
            map(resp => (resp.data || resp) as Image)
        );
    }


    voteDownById(ID: string): Observable<Image | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/vote-down').pipe(
            map(resp => (resp.data || resp) as Image)
        );
    }


    create(body: Partial<Image>): Observable<Image | any> {
        return this.http.post<IApiResource>(environment.ApiBaseUrl + '/images', body).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }


    updateOneById(ID: string, body: Partial<Image>): Observable<Image | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/images/' + ID, body).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }

    publishOneById(ID: string): Observable<Image | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/publish', null).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }

    unpublishOneById(ID: string): Observable<Image | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/images/' + ID + '/unpublish', null).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }


    getAllByAuth(): Observable<Image[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/me').pipe(
            take(1),
            map(resp => (resp.data || resp) as Image));
    }

    navigateToImage(param: string) {

        this.router.navigate(['/explorer/images/', param]);

    }
}
