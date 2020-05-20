import {Component, OnInit} from '@angular/core';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagePresenterUrl} from '../../routes';
import {ShareService} from '@ngx-share/core';
import {ImagesService} from '../../../@core/services/images.service';
import {Image} from "@app/main/@core/state/image/image.model";
import {ImagesQuery} from "@app/main/@core/state/image/images.query";
import {ImagesApiService} from "@app/main/@core/services/images-api.service";
import {take} from "rxjs/operators";
// import { library } from '@fortawesome/fontawesome-svg-core';
//
// import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';

@Component({
    selector: 'app-images-presenter',
    templateUrl: './imagepresenter.component.html',
    styleUrls: ['./imagepresenter.component.scss']
})
export class ImagePresenterComponent implements OnInit {
    public image: Image;
    public images: Image[] | any;
    public sizeList = ['sm', 'md', 'lg', 'xl'];
    public freeSizeList = ['sm', 'md'];
    public selectedSize = 'md';
    public loading = true;

    masonryOptions: NgxMasonryOptions = {
        transitionDuration: '0.8s'
    };

    defaultImage = 'assets/images$/default-image.png';
    offset = 100;
    masonryImages;
    limit = 15;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private imagesQuery: ImagesQuery,
        private imagesService: ImagesService,
        private imagesApiService: ImagesApiService,
        public share: ShareService,
    ) {
    }

    get canDownload(): boolean {
        return this.freeSizeList.includes(this.selectedSize);
    }

    ngOnInit() {

        this._route.paramMap
            .pipe(take(1))
            .subscribe(({params}: any) => {

                this.imagesApiService.findOneById(params.uid).subscribe(image => {
                    this.image = image;

                }, null, () => {
                    this.loading = false;
                });

            });
    }

    showMoreImages() {
        this.masonryImages = this.images.slice(0, this.limit);
        this.limit += 15;
    }

    showImage(image: Image) {

        this._router.navigate([ImagePresenterUrl, image.uid]);

    }

    selectSize(size: string) {
        this.selectedSize = size;
    }
}
