import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Image, ImagesApiService} from '@app/main/@core/services/images-api.service';
import {Subscription, forkJoin, interval, Subject} from 'rxjs';
import {finalize, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CategoriesApiService} from '@app/main/@core/services/categories-api.service';
import {MdbCheckboxChange} from 'ng-uikit-pro-standard';
import {remove} from 'lodash';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, OnDestroy {

    @Input() shadows = true;

    searchText1 = '';

    tableData: Selectable<Image>[] = [];
    publishing = false;
    loading = false;
    unsubscribe = new Subject();


    get isSelectionIndeterminate(): boolean {
        return this.selection.length !== 0 && this.selection.length !== this.tableData.length;
    }
    bulkOptionsSelect: object[] = [
        // { value: '1', label: 'Delete' },
        // { value: '2', label: 'Export' },
        // { value: '3', label: 'Change segment' }
        {value: '1', label: 'Images acceptés'},
        {value: '2', label: 'Image rejétés'},
        {value: '3', label: 'Image en attente'},

    ];

    constructor(
        private imagesApi: ImagesApiService,
        private router: Router,
    ) {
    }

    get isAllChecked(): boolean {
        return this.selection.length === (this.tableData || []).length;
    }

    get selection(): Image[] {
        return (this.tableData || []).filter(el => el.selected).map(el => el.data);
    }

    get hasSelection(): boolean {
        return this.selection.length !== 0 && this.selection.length > 0;
    }

    private sorted = false;
    private imagesApiSub: Subscription;

    get images(): Image[] {
        return (this.tableData || []).map(el => el.data);
    }

    get hasUnpublishableSelection(): boolean {
        return this.selection.length !== 0 && this.selection
            .filter(image => image.publishedAt !== undefined && image.publishedAt !== null)
            .length > 0;
    }

    ngOnInit() {
        this.loadImages();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    loadImages() {
        this.imagesApiSub = interval(20 * 60 * 1000).pipe(
            startWith(0),
            switchMap(() => {
                this.loading = true;
                return this.imagesApi.getAllByAuth();
            }),
            takeUntil(this.unsubscribe)
        ).subscribe(resp => {
            // console.log({resp});
            this.loading = false;
            this.tableData = resp.map(row => {
                // console.log('image', image);
                const image = row as Image;
                return new Selectable<Image>(image);
            });

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
        // console.log('editing image', image);
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

    publish() {
        const observables = this.tableData.filter(row => row.selected)
            .map(row => row.data)
            .map(row => this.imagesApi.publishOneById(row._id));

        // .reduce((previous, image, index, images ) => {
        //     previous[image._id] = this.imagesApi.publishOneById(image._id);
        //     return previous;
        // }, {});

        this.publishing = true;
        forkJoin(observables)
            .pipe(
                finalize(() => {
                    this.publishing = false;
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((response) => {
                console.log(response);
                this.loadImages();
            });

        console.log(observables);
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
