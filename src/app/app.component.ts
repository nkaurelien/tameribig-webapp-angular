import {AuthFirebaseService} from '@core/auth/_services/auth-firebase.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {SeoService} from '@core/services/seo.service';
import {environment} from '@environments/environment';
import {TranslateService} from '@ngx-translate/core';
import firebase from 'firebase';
import User = firebase.User;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tameri';

  constructor(
    private seo: SeoService,
    private translate: TranslateService,
    private afAuth: AuthFirebaseService,
    // private store: Store<fromStore.AppState>,
    // @Inject(WINDOW) private window: Window,
    // @Inject(LOCAL_STORAGE) private localStorage: any,
  ) {
        this.translate.setDefaultLang('fr');
    }

    ngOnInit() {

        /* CHECK AUTH STATE */
        this.afAuth.fireUser().pipe(
          switchMap((user: User) => {
            if (!!user) {

            } else {
              this.afAuth.fireLogout().then(() => console.log('logged out'));
              return of(null);
            }
          })
        );

        /* GENERATE SEO DATA */
        this.seo.generateTags({
          title: 'Accueil Tameri Big, Bienvenue sur la toile de partage des images, photos, creations, videos.',
          description: 'Toile de partage des images, photos, creations, videos. Mettez votre imagination a profit. L\'afrique a des talents',
          image: `${document.location.origin}/${environment.logo}`,
          slug: ''
        });
    }
}
