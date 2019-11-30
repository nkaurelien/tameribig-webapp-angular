import {Component, Input, OnInit} from '@angular/core';
import {Image, ImagesApiService} from '@app/main/@core/services/images-api.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input() shadows = true;

    tableData: Image[] = [];

    bulkOptionsSelect: object[] = [
        { value: '1', label: 'Delete' },
        { value: '2', label: 'Export' },
        { value: '3', label: 'Change segment' }
    ];

    private sorted = false;
    private imagesApiSub: Subscription;

    constructor(
        private imagesApi: ImagesApiService,
        private router: Router,
    ) { }

    ngOnInit() {

        this.imagesApiSub = this.imagesApi.getAllByAuth().subscribe(resp => {
            console.log({resp});
            this.tableData = resp;

        });
    }

    sortBy(by: string | any): void {

        this.tableData.sort((a: any, b: any) => {
            if (a[by] === undefined || a[by] === null || b[by] === undefined || b[by] === null) {
                return 0;
            }
            if (a[by] < b[by]) {
                return this.sorted ? 1 : -1;
            }
            if (a[by] > b[by]) {
                return this.sorted ? -1 : 1;
            }

            return 0;
        });

        this.sorted = !this.sorted;
    }

    uploadPicture(image: Image) {
        this.router.navigate([`/console/assets/images/${image._id}/upload-picture`]);
    }

    uploadFiles(image: Image) {
        this.router.navigateByUrl(`/console/assets/images/${image._id}/upload-source`);
    }

    edit(image: Image) {
        this.router.navigateByUrl(`/console/assets/images/${image._id}/edit`);
    }
}
