import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { tap, first } from 'rxjs/operators';
import {fromPromise} from "rxjs/internal-compatibility";


const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthFirebaseService {
    constructor(
        private http: HttpClient,
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        @Inject(LOCAL_STORAGE) private localStorage: any,
        @Inject(PLATFORM_ID) private platformId: any,
        ) {
    }


    firePasswordLogin(email: string, password: string) {
        return fromPromise(new Promise<any>((resolve, reject) => {
            // const provider = new firebase.auth.EmailAuthProvider();
            this.afAuth.auth
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
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
