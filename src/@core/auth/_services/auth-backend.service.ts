import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { tap } from 'rxjs/operators';
import {API_AUTH_USER, API_LOGIN_FIREBASE_URL, API_USERS_URL} from './auth.routes';


@Injectable()
export class AuthBackendService {
    constructor(
        private http: HttpClient,
        @Inject(LOCAL_STORAGE) private localStorage: any,
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
    }


    /**
     *
     * @param email Firebase user email
     * @param token Firebase access token
     */
    backendLogin(email, token: string) {

        return this.http.post<any>(`${API_LOGIN_FIREBASE_URL}`, {email, token}).pipe(
            tap( res => {
                // console.log('auth backen', res);

            })
        );
    }

    /**
     *
     * @param email Firebase user email
     * @param token Firebase access token
     */
    backendAuthProfile() {

        return this.http.get<any>(`${API_AUTH_USER}`).pipe(
            tap(res => {
                // console.log('auth backen', res);

            })
        );
    }


    // jwtHttpHeaders() {
    //     const token = this.localStorage.getItem('idToken');

    //     return {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //             Authorization: 'Bearer ' + token,
    //         })
    //     };

    // }

    public updateUserData(datas) {

        return this.http.put<any>(`${API_AUTH_USER}`, datas).pipe(
            tap(res => {
                // console.log('auth backen', res);

            })
        );

    }
}
