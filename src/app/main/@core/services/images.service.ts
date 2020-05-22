import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {combineAll, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {BehaviorSubject, concat, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {take} from 'rxjs/internal/operators';
import {dummyPicturesMocks, generateDummyPicturesMocks} from '@data/dummy-pictures';
import {flattenDeep, uniqBy} from 'lodash';
import {environment} from '@environments/environment';
import {Image} from "@app/main/@core/state/image/image.model";

interface UserPreferences {
    cookiesAccepted?: boolean;
}

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


@Injectable({
    providedIn: 'root',
})
export class ImagesService {

    public readonly dummyPictures = dummyPicturesMocks;
    public readonly generateDummyPicturesMocks = generateDummyPicturesMocks;

    private _images$: Observable<Image[] | any>;
    private _imagesFilterByDesc$: Observable<Image[] | any>;
    private _imagesSearchResult$ = new BehaviorSubject<Image[] | any>([]);
    private _imagesBackup$ = new BehaviorSubject<Image[] | any>([]);

    private _imagesRef:  AngularFirestoreCollection<any> = this.afs.collection<Image[]>(`images`);

    openUserProfile(authorId: string) {
        this.router.navigate(['/network', authorId]);
    }

    private _imagesByTermRef = (term): AngularFirestoreCollection<any> => this.afs.collection<Image[]>(`images`,
        ref => ref.where('description', '==', term));

    constructor(private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId: any,
                @Inject(LOCAL_STORAGE) private localStorage: any,
                private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router) {

        //// Get auth data, then get firestore user document || null
        this._images$ = this._imagesRef.valueChanges().pipe(
            tap( data => {
                this._imagesBackup$.next(data);
                // console.log('images$ collections',  data.length, data);
                // this.generateDummyPicturesMocks(10).forEach(el => this.add(el));

            })
        );
    }


    get images$() {
        return this._images$;
    }

    getImagesSnapshort(): Observable<Image[] | any> {
        return this.afs.collection<Image[]>('images').snapshotChanges();
    }

    getImages(): Observable<Image[] | any> {
        return this.afs.collection<Image[]>('images').valueChanges().pipe(take(1));
    }

    get imagesMock () {
        return of(this.dummyPictures);
    }

    get imagesBackup$() {
        return this._imagesBackup$.asObservable();
    }

    get imagesSearchResult$() {
        return this._imagesSearchResult$.asObservable();
    }



    update(uid: string, image: any) {

        const data: any | Image = {
            ...image,
        };

        data.updated_at = new Date().getTime();

        if (uid) {


            const _ref: AngularFirestoreDocument<any> = this._imagesRef.doc(`${uid}`);

            return _ref.set(data, {merge: true});
            // const prefsRef: AngularFirestoreDocument<any> = usersRef.collection('preferences').doc(`${uid}`);
            // return prefsRef.set(data, { merge: true });

        }

    }



    private add(image: any) {

        // Persist a document id
        const id = this.afs.createId();
        const data = {
            ...image,
            uid: id,
            created_at: new Date().getTime(),
            updated_at: null,
            deleted_at: null,
        };

        return this._imagesRef.doc(id).set(data);

    }

    public filterImagesTerm(term: string ) {
        // console.log({term});
        // this._imagesByTermRef(term).valueChanges().toPromise();
        return this._imagesByTermRef(term).valueChanges().pipe(
            take(15),
            tap( data => {
                this._imagesSearchResult$.next(data);
                // data.map(image => this._imagesBackup$.next(image));

                // console.log('images$ collections',  data.length, data);
                // this.generateDummyPicturesMocks(10).forEach(el => this.add(el));

            })
            // map( data => console.log('dtaaaa', data)))
        );
        // let queryRef = this._imagesRef.ref.where('description', '==', term).;
        // let queryRef = this._imagesRef.ref.where('description', '==', term).orderBy('createdAt');
        // queryRef.get().then((querySnapshot) => {
        //     let items = [];
        // console.log('good', querySnapshot);
        //     querySnapshot.forEach((doc) => {
        //         const data = doc.data();
        //       console.log(doc.id, ' => ', doc.data());
        //       items.push({id:doc.id,item : data});
        //       this._imagesSearchResult$.next({id:doc.id,item : data});
        //     });
        //     return items;
        //   });
    }

    public filterImagesTagsArray(terms: string[] ) {
        const observables = terms.map( x => this.filterImagesTags(x));
        // console.log(observables);

        return concat( observables).pipe(
            combineAll(),
            switchMap(( arr => {

                arr  =  flattenDeep(arr );
                // console.log('results', arr );
                arr =  uniqBy(arr , 'uid');
                // console.log('results sss', arr )

                return [arr];
            })),
            tap( x => console.log('results', x)),

            // catchError(x => x)
        );
    }
    public filterImagesTags(term: string ) {
        // console.log({term});
        // this._imagesByTermRef(term).valueChanges().toPromise();
        return this._imagesByTagsRef(term).valueChanges().pipe(
            take(15),
            tap( data => {
                this._imagesSearchResult$.next(data);

                // console.log('images$ collections',  data.length, data);
                // this.generateDummyPicturesMocks(10).forEach(el => this.add(el));

            })
            // map( data => console.log('dtaaaa', data)))
        );
    }

    getImageUrl(image: Image) {
        return `${environment.ApiBaseUrl}/images/open/${image.uid}`;
    }

    private _imagesByTagsRef = (term): AngularFirestoreCollection<any> => this.afs.collection<Image[]>(`images`,
        ref => ref.where('keywords', 'array-contains', term));
}
