import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxMasonryOptions} from 'ngx-masonry';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { ImagesService, Image } from '../../@core/services/images.service';


@Component({
  selector: 'app-images-explorer',
  templateUrl: './imagesexplorer.component.html',
  styleUrls: ['./imagesexplorer.component.scss']
})
export class ImagesExplorerComponent implements OnInit, OnDestroy {

    private images: Image[] | any = [];
    private imagesPromise: Promise<void>;
    private imagesSubscription: Subscription;
  constructor(
      private _router: Router,
      private imagesService: ImagesService,
  ) {}


  defaultImage = 'assets/images$/default-image.png';
  offset = 100;
  masonryImages;
  limit = 15;
  masonryOptions:  NgxMasonryOptions = {
    transitionDuration: '0.8s'
  };
  ngOnInit() {

      this.imagesSubscription = this.imagesService.images$.subscribe(images => {
          this.images = images;
          console.log(this.images)
          this.showMoreImages();
      });
  }

  showMoreImages() {
      this.masonryImages = this.images.slice(0, this.limit);
      this.limit += 15;
  }

  showImage(image: Image) {

    this._router.navigate(['/images/', image.uid]);

  }

    getImageUrl(image: Image) {
      return this.imagesService.getImageUrl(image);
    }

    ngOnDestroy() {

        if (this.imagesSubscription) {
            this.imagesSubscription.unsubscribe();
        }
    }

}
