import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { Image, ImagesService } from '../../@core/services/images.service';

@Component({
  selector: 'app-category',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  categorySlug: string;
  public  imagesSubscription: Subscription;
  public images: Image[];

  constructor(
    private _route: ActivatedRoute,
    private imageService: ImagesService,
  ) {

    const params = this._route.snapshot.params;
    // console.log({ params });
    this.categorySlug = params['slug'];

  }

  ngOnInit() {
    this.imagesSubscription = this.imageService.getImages().subscribe(data => {
      this.images = data;
      console.log(data);
    });
  }


  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }

  onScroll() {
    console.log('scrolled!!');
  }

  filterMedia(media: string) {
    console.log('ok');
    return this.imageService;
  }

  getImageUrl(image: Image) {
    return this.imageService.getImageUrl(image);
  }
}

// this.images = data.map(e => {
//   return {
//     uid: e.payload.doc.id,
//     ...e.payload.doc.data()
//   } as Image;
// });
