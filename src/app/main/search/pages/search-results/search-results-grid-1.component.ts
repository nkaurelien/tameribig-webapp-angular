import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediasSearchApiService} from '@app/main/@core/services/medias-search-api.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-results-grid-1',
  template: `
    <div *ngIf="true" class="row">
      <div class="column">

        <ng-container *ngIf="(images$ | async) as images">
          <ng-container *ngFor="let image of images">
            <app-search-results-image-card-1 style="width: 100%"
                                             [imageID]="image._id"
                                             [imageSrc]="image.miniature"
                                             [imageTitle]="image.title"
                                             [imageDownloadLink]="image.download"
                                             [imageUserPhoto]="image.miniature"
                                             [imageUserName]="'image.author'"
            ></app-search-results-image-card-1>
            <!--            <pre> {{ image | json }}</pre>-->
          </ng-container>
        </ng-container>

      </div>

      <div *ngIf="showSample" class="column">

        <img
          src="https://www.rxwallpaper.site/wp-content/uploads/free-beach-sunset-wallpapers-desktop-long-wallpapers-4-800x800.jpg"
          style="width:100%">

        <img
          src="https://www.rxwallpaper.site/wp-content/uploads/free-beach-sunset-wallpapers-desktop-long-wallpapers-4-800x800.jpg"
          style="width:100%">
        <img src="https://i.pinimg.com/originals/00/0f/85/000f8537c14a1d9e350ebdd30951fc27.jpg" style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIaBCwXKGCW9Ub7Lr-RmAoF2wJpr5NBk5Wb2npRiFaz4wIEQMsUA"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9NQ1BncFIDNjxnTFOWdaPyLdGG5-a77zKUEGzhvO0m327KB3Fhg"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58-24YV35w71NtvCRg1IVJobasdldAPhkhcgHxgTjq50F9goprw"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJ1UiOaq_MNStMdHpBEaHTs2YAKxTbQ0CIdDMj9Hsuegus6_p"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IUI0AsuowTP08NlMxbGkvPtQnjP81G9JIBxK2pvI0Eq5oMGC"
          style="width:100%">
      </div>
      <div *ngIf="showSample" class="column">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNNyqmPsZSWT7gSlMT2S3MAIKeIv6BNi8RVfUyJrt9Hz-j7cBA5w"
          style="width:100%">
        <img
          src="https://ae01.alicdn.com/kf/HTB1cZICPFXXXXcbXpXXq6xXFXXXc/Unframed-5-Pieces-The-Darkness-Sunset-Beach-Lighthouse-Lake-Michigan-HD-Top-Rated-Canvas-Print-Painting.jpg_640x640.jpg"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy5DQzfrlUV4brRt5XZfLwy8AX4hVoYARbTDmYLiiZQ63gnoeHZQ"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQ_I1QtL0NHp5nWVyXCnLznVFE4rGS_FOOYAAu0_Yczslp4vQ"
          style="width:100%">
        <img
          src="https://thumbs.dreamstime.com/b/empty-table-top-sunset-beach-blue-against-blurred-background-93335710.jpg"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86N5isuctltV2hAUAx4VL-99hz3Pg4t2DiDU7xrcCMK9lEebX"
          style="width:100%">
      </div>
      <div *ngIf="showSample" class="column">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzSw40-GTIMURAAt-jQdIgun-sHRueJ8MWBg0Pp1ZZQJleTym"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-5d5PoInsa_BDY2gSMJQdVQKiE8mFriyGnPKjR-AaLsIb4V9Tzw"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkaw-lz56yOlK5ZDV5U3-cb-QJy4QjN6i6cJKLuMnx0CWX0xV5gg"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTYO44pYWILn5kRJzESsWSKsvKivTbnL5FnSXYty1u06ZTcDSRBw"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHA2L2aOiMQVUJFqMHWPRlmG0taHfufaAaW7pBJI_-KY1CibaNww"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKoyjFzhIR0o4KKUZvaXOc4ucJvx3fYEBTZx1OKIuZaHDLoHV"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIOn2pL6QU4ScGaqBbw_o-_k4troQOLp2TswdZEMIXX986q1s"
          style="width:100%">
      </div>
      <div *ngIf="showSample" class="column">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkphkF0LB1lCscT-W4CSWakm4oTj_LbsHax_HMNg9P9eZ6EU54yA"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrabHGjP-cuyjPRd2aWdpyJi97KnezY2SH9TThRPS3V9WMn2XOKg"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3g3oNXnTLBIJ73ETsGfy9KRkJIWQGUYZBZ3TWEsMIqZm8Wsk46A"
          style="width:100%">
        <img
          src="http://architectureimg.com/wp-content/uploads/2016/06/bridges-ocean-bridge-sunset-beach-wallpaper-wide-1920x1080.jpg"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8e58jE2NV-S3b2a8vksszUanPGu9KVuX1vqaqa2_qn1PemplR"
          style="width:100%">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUlMmE0ysfjmTndj0cFVGXO7VxzCis7V3X_Bb0kgo9-zF7f4X"
          style="width:100%">
      </div>
    </div>

  `,
  styleUrls: [`search-results-grid-1.component.scss`]
})
export class SearchResultsGrid1Component implements OnInit, OnDestroy {
  images$: Observable<any>;

  showSample = false;

  // private unsubscribe = new Subject();

  constructor(
    private mediasSearchApiService: MediasSearchApiService,
    private route: ActivatedRoute,
  ) {
    this.images$ = this.mediasSearchApiService.query.selectImages$;

  }

  ngOnInit() {
    // this.images$.subscribe(searchResults => {
    //   console.log({searchResults});
    // });

    // console.log('this.route.firstChild', this.route.firstChild);

  }

  ngOnDestroy(): void {
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
  }

}
