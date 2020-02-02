import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dummyPicturesMocks } from '@data/dummy-pictures';
import {NgxMasonryOptions} from 'ngx-masonry';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-videos-explorer',
  templateUrl: './videosexplorer.component.html',
  styleUrls: [
    './videosexplorer.component.css',
    // '~/ng-masonry-grid/ng-masonry-grid.css',
  ],
  
  // encapsulation: ViewEncapsulation.None
})
export class VideosExplorerComponent implements OnInit {
  constructor() {}
  displayMode = 'mansory-grid';
  form: any = <any>{};
  dummyPictures = dummyPicturesMocks;
  defaultImage = 'assets/images$/default-image.png';
  offset = 100;
  masonryImages;
  limit = 15;
  masonryOptions:  NgxMasonryOptions = {
    transitionDuration: '0.8s'
  };
  ngOnInit() {
    this.showImages();
  }

  
  showImages() {
    this.masonryImages = this.dummyPictures.slice(0, this.limit);
  }

  get searching () {
    try {
      return (this.form.keyword || '').length > 0;      
    } catch (error) {
      return false;
    }
  }

  showMoreImages() {
    this.limit += 15;
    
      if (this.searching) {
        this.masonryImages = this.filterImagesByKeyword(this.form.keyword).slice(0, this.limit);
      } else {
        this.masonryImages = this.dummyPictures.slice(0, this.limit);

      }
  }

  filterImagesByKeyword(keyword: string) {
    return this.dummyPictures.filter(picture => {
      return  (picture.description || '').toLowerCase().includes(keyword);
     });
  }

  search(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }
    this.masonryImages = this.filterImagesByKeyword(this.form.keyword);
    

    // this.imageService.searchImages(this.form.keyword, this.page)
    //   .subscribe((res: any) => {
    //     this.images = this.images.concat(res.hits);
    //   })
  }
}
