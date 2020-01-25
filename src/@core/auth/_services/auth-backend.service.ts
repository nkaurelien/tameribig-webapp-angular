import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { tap } from 'rxjs/operators';
import { API_LOGIN_FIREBASE_URL } from './auth.routes';


@Injectable()
export class AuthBackendService {
    constructor(
        private http: HttpClient,
        private afAuth: AngularFireAuth,
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
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
            })
        }
        return this.http.post(`${API_LOGIN_FIREBASE_URL}`, { email, token }, options ).pipe(
            tap( res => {
                console.log('auth backen', res);
                
            })
        );
    }

    
    jwtHttpHeaders() {
        const token = this.localStorage.getItem('idToken');
      
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
            })
        };

    }

}
