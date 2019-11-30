import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {AuthenticationService} from '@app/auth2/_services';
import {IApiResource} from '@core/_base/crud/models/IApiResource';


export interface Categorie {
    _id: string;
    uid: string;
    name: string;
    picture: string;
    description?: string;
    class?: string;
    subclass?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


@Injectable({
    providedIn: 'root',
})
export class CategoriesApiService {


    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
    ) {

    }


    getAll(): Observable<Categorie[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/topics/').pipe(
            take(1),
            map(resp => (resp.data || resp) as Categorie)
        );
    }


    findOneById(ID: string): Observable<Categorie | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/topics/' + ID).pipe(
            take(1),
            map(resp => (resp.data || resp) as Categorie)
        );
    }

    updateOneById(ID: string, body: Partial<Categorie>): Observable<Categorie | any> {
        return this.http.put<IApiResource>(environment.ApiBaseUrl + '/topics/' + ID, body).pipe(
            take(1),
            map(resp => (resp.data || resp) as Categorie)
        );
    }


    /**
     * Get bookmarked / subscribed topics
     */
    getAllByAuth(): Observable<Categorie[] | any> {
        return this.http.get<IApiResource>(environment.ApiBaseUrl + '/topics/me').pipe(take(1));
    }
}
