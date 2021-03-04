import {Component, OnInit} from '@angular/core';
import {dummyPicturesMocks} from '@data/dummy-pictures';
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-creas-explorer',
  templateUrl: './creasexplorer.component.html',
  styleUrls: ['./creasexplorer.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class CreasExplorerComponent implements OnInit {
  constructor() {
  }
  dummyPictures = dummyPicturesMocks;



  defaultImage = 'assets/images$/default-image.png';
  offset = 100;
  masonryImages;
  limit = 15;
  masonryOptions:  NgxMasonryOptions = {
    // transitionDuration: '0.8s'
  };
  ngOnInit() {
    this.masonryImages = this.dummyPictures.slice(0, this.limit);
  }

  showMoreImages() {
      this.limit += 15;
      this.masonryImages = this.dummyPictures.slice(0, this.limit);
  }
}
