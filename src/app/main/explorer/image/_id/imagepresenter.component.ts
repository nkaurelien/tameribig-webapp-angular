import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagePresenterUrl} from '../../routes';
import {ShareService} from '@ngx-share/core';
import {ImagesService} from '../../../@core/services/images.service';
import {Image} from '@app/main/@core/state/image/image.model';
import {ImagesQuery} from '@app/main/@core/state/image/images.query';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';
import {finalize, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ModalDirective} from 'ng-uikit-pro-standard';
// import { library } from '@fortawesome/fontawesome-svg-core';
//
// import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';

@Component({
    selector: 'app-images-presenter',
    templateUrl: './imagepresenter.component.html',
    styleUrls: ['./imagepresenter.component.scss']
})
export class ImagePresenterComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('modal', {static: true}) modal: ModalDirective;

    public image: Image;
    public images: Image[] | any;
    public sizeList = ['sm', 'md', 'lg', 'xl'];
    public readonly freeSizeList = ['sm', 'md'];
    public selectedSize = 'md';
    public loading = true;

    masonryOptions: NgxMasonryOptions = {
        transitionDuration: '0.8s'
    };

    defaultImage = 'assets/images$/default-image.png';
    offset = 100;
    masonryImages;
    limit = 15;
    public image$: Observable<Image | Image[]>;
    private unsubscribe = new Subject<any>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private imagesQuery: ImagesQuery,
        private imagesService: ImagesService,
        private imagesApiService: ImagesApiService,
        public share: ShareService,
    ) {
    }

    get canDownload(): boolean {
        return !!this.freeSizeList && this.freeSizeList.includes(this.selectedSize);
    }

    ngOnInit() {

        this.image$ = this.imagesApiService.query.selectActive();

        this.route.paramMap
            .pipe(take(1))
            .subscribe(({params}: any) => {

                this.image = this.imagesApiService.query.getActive() as Image;

                if (!this.imagesApiService.query.hasActive() || this.imagesApiService.query.getActiveId() !== params.uid) {
                    this.loading = true;
                    this.imagesApiService.findOneById(params.uid)
                        .pipe(
                            takeUntil(this.unsubscribe),
                            finalize(() => this.loading = false))
                        .subscribe();

                }
            });
    }

    ngAfterViewInit() {
        this.modal.show();

    }

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }

    onHideModal() {
        this.location.back();
    }

    showMoreImages() {
        this.masonryImages = this.images.slice(0, this.limit);
        this.limit += 15;
    }

    showImage(image: Image) {

        this.router.navigate([ImagePresenterUrl, image.uid]);

    }

    liked(id, event?: boolean) {

        if (event === true) {
            this.imagesApiService.voteUpById(id)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe();
        }

    }

    selectSize(size: string) {
        this.selectedSize = size;
    }

    openUserProfile(image) {
        this.imagesService.openUserProfile(image);
    }
}
