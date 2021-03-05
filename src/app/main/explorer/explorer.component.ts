import {Component, OnInit} from '@angular/core';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {dummyPicturesMocks} from '@data/dummy-pictures';

@Component({
    selector: "app-home",
    templateUrl: "./explorer.component.html",
    styleUrls: ["./explorer.component.scss"]
})
export class ExplorerComponent implements OnInit {


    public masonryOptions: NgxMasonryOptions = {
        // transitionDuration: '0.2s',
        gutter: 20,
        resize: true,
        initLayout: true,
        fitWidth: true
    };


    defaultImage = 'assets/images/default-image.png';
    offset = 100;

    imageSources = [
        'assets/images/background/tete-image-01.jpg',
        'assets/images/background/tete-image-02.jpg'
    ];


    constructor(
        private modalService: NgbModal
    ) {
    }

    dummyPictures = dummyPicturesMocks;

    masonryImages;
    limit = 15;

    ngOnInit() {
        this.masonryImages = this.dummyPictures.slice(0, this.limit);

    }

    showMoreImages() {
        this.limit += 15;
        this.masonryImages = this.dummyPictures.slice(0, this.limit);
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            //   this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }
}
