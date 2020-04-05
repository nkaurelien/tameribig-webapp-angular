import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, ElementRef  } from '@angular/core';
import { dummyPicturesMocks } from '@data/dummy-pictures';
import {NgxMasonryOptions} from 'ngx-masonry';
import { NgForm } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { WINDOW } from '@ng-toolkit/universal';

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
  isMobile: boolean;
  isTablet: boolean;
  deviceInfo: any;
  isDesktopDevice: boolean;
  isSmallDesktopDevice: boolean;

  displayMode = 'mansory-grid';
  form: any = <any>{};
  dummyPictures = dummyPicturesMocks;
  defaultImage = 'assets/images$/default-image.png';
  offset = 100;
  masonryImages;
  limit = 15;
  masonryOptions:  NgxMasonryOptions = {
    transitionDuration: '0.8s',
    gutter: 10,
    columnWidth: 350,
    fitWidth: true
};
scrollAnimationOptions: {
  animationEffect: 'effect-2',
  minDuration: 0.4,
  maxDuration: 0.7
};
imageWidth: 540;

  SM_SCREEN_BREAKPOINT = 365;
  MD_SCREEN_BREAKPOINT = 768;

  @ViewChild('gridContainerRef', {static: true})
  gridContainerRef: ElementRef;

  constructor(
    private deviceService: DeviceDetectorService,
    
    @Inject(WINDOW)
    private window: Window
  ) {
    this.isSmallDesktopDevice = false;

  }
  
  ngOnInit() {

    if (this.window.innerWidth <= this.SM_SCREEN_BREAKPOINT) {
      this.isSmallDesktopDevice = true;
    }

     this.isMobile = this.deviceService.isMobile();
     this.isTablet = this.deviceService.isTablet();
     this.isDesktopDevice = this.deviceService.isDesktop();

     this.deviceInfo = this.deviceService.getDeviceInfo();
     console.log(this.deviceInfo);
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
