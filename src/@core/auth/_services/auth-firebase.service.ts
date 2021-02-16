import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import {tap, first, switchMap, exhaustMap, mergeMap, map, concat} from 'rxjs/operators';
import {fromPromise} from "rxjs/internal-compatibility";
import {Observable, of} from 'rxjs';
import { AuthBackendService } from './auth-backend.service';
import * as firebase from 'firebase/app';

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



    private switchMapToServer(userRecord: firebase.User) {
        return fromPromise(userRecord.getIdToken(/* forceRefresh */  true)).pipe(
            switchMap(idToken => {
                this.localStorage.setItem(environment.authTokenKey, idToken);
                // console.log({idToken});
                return this.authBackend.backendLogin(userRecord.email, idToken)
                    .pipe(
                        map(response => response.data || response),
                        map(data => {
                            data.accessToken = idToken;
                            return data;
                        })
                    );
            })
        );
    }


    firePasswordLogin(email: string, password: string): Observable<any> {
        return fromPromise(
            this.afAuth.auth
                .signInWithEmailAndPassword(email, password)
                .then(async (res) => {
                    const user = this.afAuth.auth.currentUser.toJSON();
                    // const access_token = user.stsTokenManager.accessToken;
                    // this.localStorage.setItem('currentUser', JSON.stringify(user));

                    // console.log('this.afAuth.auth.currentUser', this.afAuth.auth.currentUser.toJSON());
                    // console.log('this.afAuth.auth.currentUser.getIdTokenResult', await this.afAuth.auth.currentUser.getIdTokenResult());
                    // console.log('this.afAuth.auth.currentUser.getIdTokenResult', await this.afAuth.auth.currentUser.getIdToken());
                    // console.log('access_token', access_token);

                    return this.afAuth.auth.currentUser;
                })
        ).pipe(
            tap(userRecord => {
                // console.log({userRecord});
            }),
            switchMap((userRecord, idx) => {
                return this.switchMapToServer(userRecord);
            })
        );
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
                    this.localStorage.clear();
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


    doFacebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return fromPromise(
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    return this.afAuth.auth.currentUser;
                })
        ).pipe(
            tap(userRecord => {
                // console.log({userRecord});
            }),
            switchMap((userRecord, idx) => {
                return this.switchMapToServer(userRecord);
            })
        );
    }

    doGoogleLogin() {

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        return fromPromise(
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    return this.afAuth.auth.currentUser;
                })
        ).pipe(
            tap(userRecord => {
                // console.log({userRecord});
            }),
            switchMap((userRecord, idx) => {
                return this.switchMapToServer(userRecord);
            })
        );
    }

    public updateUserData(user) {

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: any = {
            ...user,
        };
        return fromPromise(userRef.set(data, {merge: true}));

    }

}
