import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dummyPicturesMocks } from '@data/dummy-pictures';
import {NgxMasonryOptions} from 'ngx-masonry';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators'

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
  constructor(
    private formBuilder: FormBuilder,
  ) {}

  filterForm: FormGroup;
  displayMode = 'mansory-grid';
  dummyPictures = dummyPicturesMocks;
  defaultImage = 'assets/images$/default-image.png';
  offset = 100;
  masonryImages;
  limit = 15;
  masonryOptions:  NgxMasonryOptions = {
    transitionDuration: '0.8s'
  };
  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      keyword: ''
    });
    this.filterForm.get('keyword').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap( val => this.search(this.filterForm))
    ).subscribe(val => { 
      // console.log( `searching keyword is ${val}.`);
    });

    this.showImages();
  }

  
  showImages() {
    this.masonryImages = this.dummyPictures.slice(0, this.limit);
  }

  get searching () {
    try {
      return (this.filterForm.get('keyword').value || '').length > 0;      
    } catch (error) {
      return false;
    }
  }

  showMoreImages() {
    this.limit += 15;
    
      if (this.searching) {
        this.masonryImages = this.filterImagesByKeyword(this.filterForm.get('keyword').value).slice(0, this.limit);
      } else {
        this.masonryImages = this.dummyPictures.slice(0, this.limit);

      }
  }

  filterImagesByKeyword(keyword: string) {
    return this.dummyPictures.filter(picture => {
      return  (picture.description || '').toLowerCase().includes(keyword);
     });
  }

  search(searchForm: FormGroup) {
    if (searchForm.invalid) {
      return;
    }
    this.masonryImages = this.filterImagesByKeyword(searchForm.get('keyword').value);
    // console.log( `Searching`, this.searching);
    

    // this.imageService.searchImages(this.form.keyword, this.page)
    //   .subscribe((res: any) => {
    //     this.images = this.images.concat(res.hits);
    //   })
  }
}
