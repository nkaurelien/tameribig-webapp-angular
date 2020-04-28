import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {dummyPicturesMocks} from '@data/dummy-pictures';
import {ImagesApiService} from '../../@core/services/images-api.service';
import {NgxMasonryOptions} from 'ngx-masonry';
import {NgForm, FormBuilder, FormGroup} from '@angular/forms';
import {tap, distinctUntilChanged, debounceTime, takeUntil} from 'rxjs/operators'
import {Subject} from 'rxjs';
import {generateDummyPicturesMocks} from 'src/@data/dummy-pictures';

@Component({
    selector: 'app-videos-explorer',
    templateUrl: './videosexplorer.component.html',
    styleUrls: [
        './videosexplorer.component.css',
        // '~/ng-masonry-grid/ng-masonry-grid.css',
    ],

    // encapsulation: ViewEncapsulation.None
})
export class VideosExplorerComponent implements OnInit, OnDestroy {

    filterForm: FormGroup;
    displayMode = 'mansory-grid';
    dummyPictures = dummyPicturesMocks;
    defaultImage = 'assets/images$/default-image.png';
    offset = 100;
    masonryImages;
    limit = 15;
    masonryOptions: NgxMasonryOptions = {
        transitionDuration: '0.8s'
    };
    private unsubscribe = new Subject();

    constructor(
        private imagesService: ImagesApiService,
        private formBuilder: FormBuilder,
    ) {
        this.dummyPictures = generateDummyPicturesMocks(60);
    }

    get searching() {
        try {
            return (this.filterForm.get('keyword').value || '').length > 0;
        } catch (error) {
            return false;
        }
    }

    ngOnInit() {

        this.filterForm = this.formBuilder.group({
            keyword: ''
        });
        this.filterForm.get('keyword').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(val => this.search(this.filterForm)),
            takeUntil(this.unsubscribe)
        ).subscribe(val => {
            // console.log( `searching keyword is ${val}.`);
        });

        this.showImages();
    }

    ngOnDestroy() {

        this.unsubscribe.next(true);
        // this.unsubscribe.unsubscribe();
        this.unsubscribe.complete();
    }

    showImages() {
        this.masonryImages = this.dummyPictures.slice(0, this.limit);
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
            return (picture.description || '').toLowerCase().includes(keyword);
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

    liked(id, event?: boolean) {

        if (event === true) {
            this.imagesService.voteUpById(id || '5e2abcb28ddd5425987c02d3')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe();
        }

    }

    navigateToImage(id) {
        this.imagesService.navigateToImage(id || '5e2abcb28ddd5425987c02d3')

    }

}
