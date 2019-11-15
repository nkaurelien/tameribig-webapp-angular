import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {first, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {RouterStateSnapshot} from '@angular/router';
import {User} from '../_models';

export class PhoneNumber {
    country: string;
    area: string;
    prefix: string;
    line: string;

    // format phone numbers as E.164
    get e164() {
        const num = this.country + this.area + this.prefix + this.line;
        return `+${num}`;
    }

}

interface FirebaseUser {
    uid: string;
    email: string;
    photoURL?: string;
    phoneNumber?: string;
    displayName?: string;
    favoriteColor?: string;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    lastLoginAt?: number;
    apiKey?: string;
    authDomain?: string;
}

interface AuthChecking {
    loggedIn: boolean;
    user?: any;
    routerState: RouterStateSnapshot;
}

const initialAuthChecking: AuthChecking = {loggedIn: false, user: null, routerState: null};

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private _firebaseUser$: Observable<FirebaseUser | any>;
    private user$: Observable<FirebaseUser | any>;

    private _token: string;
    private _subscriptions: Subscription[];

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(LOCAL_STORAGE) private localStorage: any,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore
    ) {
        this.loadFireUser();

    }
    private _loggedIn$ = new BehaviorSubject<AuthChecking>(initialAuthChecking);

    /**
     * Get auth data, then get firestore user document || null
     */
    private loadFireUser() {
        this._firebaseUser$ = this.afAuth.authState.pipe(
            first(),
            tap((user: Partial<firebase.User>) => {
                // console.log('suer',user);
                if (!user) {

                    // this._loggedIn$.next({loggedIn: false, user: null, routerState: null});
                    return;
                }
                this.localStorage.removeItem('currentUser');

                const _fbUser = this.afs.doc<FirebaseUser>(`users/${user.uid}`).valueChanges();

                this.localStorage.setItem('currentUser', JSON.stringify(user));

                this._loggedIn$.next({loggedIn: true, user: user, routerState: null});
            })
        );
        this._subscriptions = [];
        this._subscriptions.push(this._firebaseUser$.subscribe());
    }

    get loggedIn$(): BehaviorSubject<AuthChecking> {
        return this._loggedIn$;
    }

    get token() {
        return this._token = localStorage.getItem('token') || null;
    }

    get isLoggedIn$(): Observable<AuthChecking> {
        return this._loggedIn$.asObservable();
    }

    get firebaseUser() {
        return this._firebaseUser$;
    }

    login(email: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({email: email, password: password}))
            .pipe(
                map((response: HttpResponse<any>) => {
                    // login successful if there's a jwt token in the response
                    const user = response.body;
                    if (user && user.token) {
                        this._loggedIn$.next({loggedIn: true, user: user, routerState: null});
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                })
            );
    }

    logout(): Promise<any> {
        this._loggedIn$.next(initialAuthChecking);
        // remove user from local storage to log user out
        const clearStorage =  () => {
            return new Promise((resolve, reject) => {
                try {
                    this.localStorage.removeItem('currentUser');
                    this.localStorage.removeItem('preferences');
                    this.localStorage.removeItem('user');
                    // this.localStorage.clear();
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

    signOut() {

    }


    doFirePasswordLogin(email: string, password: string) {
        return new Promise<any>((resolve, reject) => {
            // const provider = new firebase.auth.EmailAuthProvider();
            this.afAuth.auth
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    // this.updateUserData(res.user);
                    this._loggedIn$.next({ loggedIn: true, user: res.user, routerState: null });
                    localStorage.setItem('currentUser', JSON.stringify(res.user));
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    doFireRegister(value) {

        return new Promise<any>((resolve, reject) => {
            this.afAuth.auth
                .createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    const data = {
                        ...value,
                        ...res.user
                    };
                    this._loggedIn$.next({ loggedIn: true, user: res.user, routerState: null });

                    this.updateUserData(data);
                    resolve(res);
                }, err => reject(err));
        });
    }


    public updateUserData(user) {
        // Sets user data to firestore on login

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: FirebaseUser|any = {
            ...user,
        };

        return userRef.set(data, {merge: true});

    }

    public unsubscribeAll() {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
}
