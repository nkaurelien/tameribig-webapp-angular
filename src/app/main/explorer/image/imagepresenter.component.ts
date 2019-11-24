import { Component, OnInit } from '@angular/core';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagePresenterUrl} from '../../explorer/routes';
import { ShareService } from '@ngx-share/core';
import { Image, ImagesService } from '../../@core/services/images.service';
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

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private imagesService: ImagesService,
        public share: ShareService,
    ) {}

    defaultImage = 'assets/images$/default-image.png';
    offset = 100;
    masonryImages;
    limit = 15;
    masonryOptions:  NgxMasonryOptions = {
        transitionDuration: '0.8s'
    };

    get canDownload(): boolean {
        return this.freeSizeList.includes(this.selectedSize);
    }
    ngOnInit() {

        this.imagesService.images$.subscribe(images => {

            this.images = images;

            // console.log("this.images", this.images);


            this._route.paramMap.subscribe(({params}: any) => {

                this.images.forEach((el: Image) => {

                    if (el.uid === params.uid) {
                        this.image = el;
                        // break;
                    }
                });
            });
        }, null, () => { this.loading = false});
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
