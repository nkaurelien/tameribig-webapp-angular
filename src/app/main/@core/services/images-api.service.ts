import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {AuthenticationService} from '@app/auth2/_services';
import {IApiResource} from '@core/_base/crud/models/IApiResource';


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
    updatedAt?: string;
    deletedAt?: string;
    upvote?: number;

    keywords?: string[];
    // tags?: string[];
    topics?: string[];
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

    updateOneById(ID: string, body: Partial<Image>): Observable<Image | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/images/' + ID, body).pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }


    getAllByAuth(): Observable<Image[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/me').pipe(
            take(1),
            map(resp => (resp.data || resp) as Image));
    }
}