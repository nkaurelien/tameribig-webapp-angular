import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input() shadows = true;

    tableData: object[] = [
        { first: 'Mark', last: 'Otto', username: '@mdo', email: 'markotto@gmail.com', country: 'USA', city: 'San Francisco' },
        { first: 'Jacob', last: 'Thornton', username: '@fat', email: 'jacobt@gmail.com', country: 'France', city: 'Paris' },
        { first: 'Larry', last: 'the Bird', username: '@twitter', email: 'larrybird@gmail.com', country: 'Germany', city: 'Berlin' },
        { first: 'Paul', last: 'Topolski', username: '@P_Topolski', email: 'ptopolski@gmail.com', country: 'Poland', city: 'Warsaw' },
        { first: 'Anna', last: 'Doe', username: '@andy', email: 'annadoe@gmail.com', country: 'Spain', city: 'Madrid' }
    ];

    bulkOptionsSelect: object[] = [
        { value: '1', label: 'Delete' },
        { value: '2', label: 'Export' },
        { value: '3', label: 'Change segment' }
    ];

    filterOptionsSelect: object[] = [
        { value: '1', label: 'Contacts in no segments (100)' },
        { value: '2', label: 'Segment 1  (2000)' },
        { value: '3', label: 'Segment 2  (1000)' },
        { value: '4', label: 'Segment 3  (4000)' }
    ];

    private sorted = false;

    constructor() { }

    ngOnInit() {
    }

    sortBy(by: string | any): void {

        this.tableData.sort((a: any, b: any) => {
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

}
