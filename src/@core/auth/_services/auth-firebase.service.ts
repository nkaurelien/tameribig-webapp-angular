import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { tap, first } from 'rxjs/operators';
import {fromPromise} from "rxjs/internal-compatibility";
import { Observable } from 'rxjs';
import { AuthBackendService } from './auth-backend.service';


const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthFirebaseService {
    constructor(
        private http: HttpClient,
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        public readonly authBackend: AuthBackendService,
        @Inject(LOCAL_STORAGE) private localStorage: any,
        @Inject(PLATFORM_ID) private platformId: any,
        ) {
    }


    firePasswordLogin(email: string, password: string): Observable<firebase.User> {
        return fromPromise(new Promise<any>((resolve, reject) => {
            // const provider = new firebase.auth.EmailAuthProvider();
            this.afAuth.auth
                .signInWithEmailAndPassword(email, password)
                .then( async (res) => {
                    const user = <any>this.afAuth.auth.currentUser.toJSON();
                    // const access_token = user.stsTokenManager.accessToken;
                    const idToken = await this.afAuth.auth.currentUser.getIdToken(/* forceRefresh */  true);
                    this.localStorage.setItem('currentUser', JSON.stringify(user));
                    this.localStorage.setItem('idToken', idToken);

                    // console.log('this.afAuth.auth.currentUser', this.afAuth.auth.currentUser.toJSON());
                    // console.log('this.afAuth.auth.currentUser.getIdTokenResult', await this.afAuth.auth.currentUser.getIdTokenResult());
                    // console.log('this.afAuth.auth.currentUser.getIdTokenResult', await this.afAuth.auth.currentUser.getIdToken());
                    // console.log('access_token', access_token);
                    this.authBackend.backendLogin(user.email, idToken).subscribe(response => {

                    });
                    
                    resolve(this.afAuth.auth.currentUser);
                });
        }));
    }


    fireRegister(value) {

        return new Promise<any>((resolve, reject) => {
            this.afAuth.auth
                .createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err));
        });
    }


    /**
     * Get auth data, then get firestore user document || null
     */
    fireUser() {
        return this.afAuth.authState.pipe(
            first(),
            tap((user: Partial<firebase.User>) => {})
        );
    }

    fireLogout(): Promise<any> {
        const clearStorage = () => {
            return new Promise((resolve, reject) => {
                try {
                    this.localStorage.removeItem('user');
                    resolve();
                } catch (e) {
                    reject();
                }
            });
        };

        return Promise.all([
            clearStorage(),
            this.afAuth.auth.signOut(),
        ]);
    }

}
