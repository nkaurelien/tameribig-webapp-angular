import {Component, Input, OnInit} from '@angular/core';
import {Image, ImagesApiService} from '@app/main/@core/services/images-api.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CategoriesApiService} from '@app/main/@core/services/categories-api.service';
import {MdbCheckboxChange} from 'ng-uikit-pro-standard';
import {remove} from 'lodash';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input() shadows = true;

    searchText1 = '';

    tableData: Selectable<Image>[] = [];

    get isSelectionIndeterminate(): boolean {
        return this.selection.length !== 0 && this.selection.length !== this.tableData.length;
    }

    get isAllChecked(): boolean {
        return this.selection.length === (this.tableData || []).length;
    }

    get selection(): Image[] {
        return (this.tableData || []).filter(el => el.selected).map(el => el.data);
    }

    bulkOptionsSelect: object[] = [
        // { value: '1', label: 'Delete' },
        // { value: '2', label: 'Export' },
        // { value: '3', label: 'Change segment' }
        {value: '1', label: 'Images acceptés'},
        {value: '1', label: 'Image rejétés'},
        {value: '1', label: 'Image en attente'},

    ];

    private sorted = false;
    private imagesApiSub: Subscription;

    get images(): Image[] {
        return (this.tableData || []).map(el => el.data);
    }

    constructor(
        private imagesApi: ImagesApiService,
        private router: Router,
    ) { }

    ngOnInit() {

        this.imagesApiSub = this.imagesApi.getAllByAuth().subscribe(resp => {
            // console.log({resp});
            this.tableData = resp.map(row => new Selectable(row));

        });
    }

    extractTopicsNames(items: any) {
        return CategoriesApiService.extractTopicsNames(items);
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

    selectRow($event: MdbCheckboxChange, item: Selectable<Image>) {
        const idx = this.tableData.findIndex(T => T.data._id === item.data._id);

        if ($event.checked) {
            if (idx !== -1) {
                this.tableData[idx].selected = true;
            }
        } else {
            if (idx !== -1) {
                this.tableData[idx].selected = false;
            }
        }
    }

    toggleRows($event: MdbCheckboxChange) {

        if ($event.checked) {
            this.tableData = this.tableData.map(selectable => {
                selectable.selected = true;
                return selectable;
            });
        } else {
            this.tableData = this.tableData.map(selectable => {
                selectable.selected = false;
                return selectable;
            });
        }

    }


    trackByID(index, item) {
        if (!item) {
            return null;
        }
        return item._id;
    }
}

export class Selectable<T> {
    public selected: boolean;
    public data: T;

    constructor(data: T, selected = false) {
        this.data = data;
        this.selected = selected;
    }
}
