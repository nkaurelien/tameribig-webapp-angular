import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ImagesApiService} from "@app/main/@core/services/images-api.service";

@Component({
  selector: 'app-search-results-image-card-1',
  template: `
    <div class="image-card masonry-content" data-card-index="23" style="background: rgb(241, 242, 244);">
      <img
        class="image"
        src="{{ imageSrc }}"
        alt="black and white short coated dog">
      <div (click)="openDetail()" class="image-card--clickable-area"></div>
      <div class="image-card--options">
        <div class="user-info">
          <a href="{{ imageUserLink }}" target="_blank_" tabindex="-1"><img
            src="{{ imageUserPhoto }}"
            alt=""></a>
          <h3>{{ imageUserName }}</h3>
        </div>
        <div class="links">
          <a *ngIf="imageInstagramLink" class="link" href="{{ imageInstagramLink }}" target="_blank_"
             tabindex="-1" style="display: block;">
            <div class="icon instagram">
              <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="false">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </div>
          </a>
          <a *ngIf="imageTwitterLink" class="link" href="{{ imageTwitterLink }}" target="_blank_" tabindex="-1"
             style="display: none;">
            <div class="icon twitter">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="false">
                <path
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </div>
          </a><a *ngIf="imageDownloadLink" class="link" href="{{ imageDownloadLink }}" tabindex="-1">
          <div class="icon download">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="false">
              <path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path>
            </svg>
          </div>
        </a></div>
      </div>
      <div class="px-2 image-card--caption">{{ imageTitle }}</div>

      <div class="image-card-fg hide" style="background: rgb(241, 242, 244);"></div>
    </div>


  `,
  styleUrls: [`search-results-image-card-1.component.scss`]
})
export class SearchResultsImageCard1Component implements OnInit, OnDestroy {

  // @Input()
  // public image: any;

  @Input()
  public imageSrc: string;

  @Input() public imageID: string;
  @Input() public imageTitle: string;

  // public imageShortDesc: string;
  // public imageDesc: string;

  @Input() public imageOpenLink: string;

  @Input() public imageUserPhoto: string;

  @Input() public imageUserName: string;

  @Input() public imageUserLink: string;

  @Input() public imageDownloadLink: string;

  @Input() public imageTwitterLink: string;

  @Input() public imageInstagramLink: string;

  // private unsubscribe = new Subject();

  constructor(
    private imagesApiService: ImagesApiService,
  ) {

  }

  ngOnInit() {

    console.log(this.imageSrc, this.imageTitle, this.imageUserLink);
    // this.images$.subscribe(searchResults => {
    //   console.log({searchResults});
    // });

    // console.log('this.route.firstChild', this.route.firstChild);

  }

  ngOnDestroy(): void {
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
  }

  openDetail() {
    this.imagesApiService.navigateToImage(this.imageID);

  }
}
