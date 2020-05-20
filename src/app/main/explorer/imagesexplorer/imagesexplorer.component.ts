import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {dummyPicturesMocks} from '@data/dummy-pictures';
import {NgxMasonryOptions} from 'ngx-masonry';
import {FormBuilder, FormGroup} from '@angular/forms';
import {tap, distinctUntilChanged, debounceTime, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {generateDummyPicturesMocks} from 'src/@data/dummy-pictures';
import {ImagesService} from '@app/main/@core/services/images.service';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';
import {Router} from '@angular/router';
import {Image} from "@app/main/@core/state/image/image.model";
import {ImagesQuery} from "@app/main/@core/state/image/images.query";

@Component({
    selector: 'app-images-explorer',
    templateUrl: './imagesexplorer.component.html',
    styleUrls: ['./imagesexplorer.component.scss']
})
export class ImagesExplorerComponent implements OnInit, OnDestroy {

    filterForm: FormGroup;
    masonryOptions: NgxMasonryOptions = {
        transitionDuration: '0.8s'
    };
    displayMode = 'mansory-grid';
    images = [];
    // images = dummyPicturesMocks;
    defaultImage = 'assets/images$/default-image.png';
    offset = 100;
    masonryImages;
    images$: Observable<Image[]>;
    limit = 15;
    private unsubscribe = new Subject();

    constructor(
        private imagesApiService: ImagesApiService,
        private imagesService: ImagesService,
        private imagesQuery: ImagesQuery,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.images = generateDummyPicturesMocks(60);
    }

    get searching() {
        try {
            return (this.filterForm.get('keyword').value || '').length > 0;
        } catch (error) {
            return false;
        }
    }

    ngOnInit() {

        this.images$ = this.imagesQuery.selectAll();

        this.images$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(resp => {
                // console.log('this.images$', resp);
                this.images = resp;
            });
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

        this.imagesApiService.getAll().subscribe();

        this.showImages();
    }


    showImages() {
        this.masonryImages = this.images.slice(0, this.limit);
    }

    showDetail(image: Image) {

        this.router.navigate(['/images/', image.uid]);

    }

    ngOnDestroy() {

        this.unsubscribe.next(true);
        // this.unsubscribe.unsubscribe();
        this.unsubscribe.complete();
    }
    getImageUrl(image: Image) {
        return this.imagesService.getImageUrl(image);
    }

    showMoreImages() {
        this.limit += 15;

        if (this.searching) {
            this.masonryImages = this.filterImagesByKeyword(this.filterForm.get('keyword').value).slice(0, this.limit);
        } else {
            this.masonryImages = this.images.slice(0, this.limit);

        }
    }

    filterImagesByKeyword(keyword: string) {
        return this.images.filter(picture => {
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
            this.imagesApiService.voteUpById(id || '5e2abcb28ddd5425987c02d3')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe();
        }

    }

    navigateToImage(id) {
        this.imagesApiService.navigateToImage(id || '5e2abcb28ddd5425987c02d3');

    }

}
