import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagePresenterUrl} from '../../routes';
import {ShareService} from '@ngx-share/core';
import {ImagesService} from '../../../@core/services/images.service';
import {Image, ImageBreakpoint} from '@app/main/@core/state/image/image.model';
import {ImagesQuery} from '@app/main/@core/state/image/images.query';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';
import {finalize, take, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {WINDOW} from '@ng-toolkit/universal';
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
    public readonly freeBreakpointCeil = 700;
    public selectedBreakpoint: ImageBreakpoint = {height: null};
    public loading = true;
    public licenceChecked: false;

    masonryOptions: NgxMasonryOptions = {
        // transitionDuration: '0.8s'
    };

    defaultImage = 'assets/images$/default-image.png';
    offset = 100;
    masonryImages;
    limit = 15;
    public image$: Observable<Image | Image[]>;
    private unsubscribe = new Subject<any>();
    public downloading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private imagesQuery: ImagesQuery,
        private imagesService: ImagesService,
        private imagesApiService: ImagesApiService,
        public share: ShareService,
        @Inject(WINDOW)
        public window: Window,
    ) {
    }

    get canFreeDownload(): boolean {
        return this.freeBreakpointCeil >= this.selectedBreakpoint.height;
    }

    get lockDownload(): boolean {
        return !this.licenceChecked || this.downloading;
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

    selectBreakpoint(item) {
        this.selectedBreakpoint = item;
    }

    openUserProfile(image) {
        this.imagesService.openUserProfile(image);
    }

    download(url = null) {
        // console.log('download_iframe', url || this.selectedBreakpoint.secure_url);
        const iframe = (this.window.document.getElementById('download_iframe') as HTMLIFrameElement);
        iframe.src = '';
        setTimeout(() => iframe.src = url || this.selectedBreakpoint.secure_url, 500);
    }

    downloadImageZipped(image) {
        this.downloading = false;
        this.imagesApiService.createImageDownloadZipUrl(image._id)
            .pipe(
                tap(() => {
                    this.downloading = true;
                }),
                finalize(() => {
                    setTimeout(() => this.downloading = false, 3000);
                }),
                takeUntil(this.unsubscribe)
            ).subscribe((response) => {
            this.download(response);
        });
    }

    downloadAnchor() {

    }

    downloadBlob(blob) {
        const url = URL.createObjectURL(blob);
        const a = this.window.document.createElement('a') as HTMLAnchorElement;
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        // a.download = '';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // alert('your file has downloaded!'); // or you know, something with better UX...
    }
}
