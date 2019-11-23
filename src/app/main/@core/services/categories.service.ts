import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {map, mergeMap, switchMap, tap, mergeAll, concatAll, combineAll, flatMap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Observable, of, merge, concat, combineLatest} from 'rxjs';
import {Router, RouterStateSnapshot} from '@angular/router';
import {catchError, take} from 'rxjs/internal/operators';
import {BehaviorSubject} from 'rxjs';
import {dummyCategoriesMocks, generateDummyCategorieMocks} from '@data/dummy-categories';



export interface Categorie {
  uid: string;
  libelle: string;
  picture: string;
  class?: string;
  subclass?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  public readonly dummy = dummyCategoriesMocks;
  public readonly generateDummyCategoriesMocks = generateDummyCategorieMocks;

  private _categories$: Observable<Categorie[] | any>;
  private _categoriesBackup$ = new BehaviorSubject<Categorie[] | any>([]);

  private _categoriesRef:  AngularFirestoreCollection<any> = this.afs.collection<Categorie[]>(`categories`);

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: any,
              @Inject(LOCAL_STORAGE) private localStorage: any,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {


    this._categories$ = this._categoriesRef.valueChanges().pipe(
      take(1),
      tap( data => {
        this._categoriesBackup$.next(data);
        // console.log('categories$ collections',  data.length, data);
        // this.generateDummyCategoriesMocks(10).forEach(el => this.add(el));
        //   this.dummy.forEach(el => this.add(el));

      })
    );
  }


  get categories$() {
    return this._categories$;
  }


  get imagesMock () {
    return of(this.dummy);
  }

  get categoriesBackup$() {
    return this._categoriesBackup$.asObservable();
  }



  update(uid: string, image: any) {

    const data: any | Categorie = {
      ...image,
    };

    data.updated_at = new Date().getTime();

    if (uid) {


      const _ref: AngularFirestoreDocument<any> = this._categoriesRef.doc(`${uid}`);

      return _ref.set(data, {merge: true});
      // const prefsRef: AngularFirestoreDocument<any> = usersRef.collection('preferences').doc(`${uid}`);
      // return prefsRef.set(data, { merge: true });

    }

  }



  private add(item: any) {

    // Persist a document id
    const id = this.afs.createId();
    const data = {
      ...item,
      uid: id,
      created_at: new Date().getTime(),
      updated_at: null,
      deleted_at: null,
    };

    return this._categoriesRef.doc(id).set(data);

  }

}
