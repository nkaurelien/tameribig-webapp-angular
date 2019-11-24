import { Component, OnInit } from '@angular/core';
import { SeoService } from '@core/services/seo.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tameri';

  constructor(

    private seo: SeoService,
    // private store: Store<fromStore.AppState>,
    // @Inject(WINDOW) private window: Window,
    // @Inject(LOCAL_STORAGE) private localStorage: any,
  ) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Accueil Tameri Big, Bienvenue sur la toile de partage des images, photos, creations, videos.',
      description: "Toile de partage des images, photos, creations, videos. Mettez votre imagination a profit. L'afrique a des talents",
      image: `${document.location.origin}/${environment.logo}`,
      slug: ''
    });
  }
}
