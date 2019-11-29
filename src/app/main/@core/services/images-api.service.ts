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
    uid: string;
    picture: string;
    miniature: string;
    title: string;
    description: string;
    content: any;
    price: number;
    author: Author;
    userId: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    upvote?: number;

    keywords?: string[];
    tags?: string[];
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


    getImages(): Observable<Image[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/').pipe(
            take(1),
            map(resp => (resp.data || resp) as Image)
        );
    }


    getImagesByAuth(): Observable<Image[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/images/me').pipe(take(1));
    }


}
