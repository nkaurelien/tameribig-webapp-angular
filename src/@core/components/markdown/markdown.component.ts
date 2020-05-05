import marked from 'marked';
import {Component, Input, OnChanges} from '@angular/core';
import {MarkdownService} from './markdown.service';

@Component({
    selector: 'markdown',
    template: `
        <div [innerHTML]="convertedData">
        </div>
    `
})
export class MarkdownComponent implements OnChanges {

    @Input()
    data: string;

    private convertedData: any;

    constructor(
        private readonly md: MarkdownService
    ) {
    }

    ngOnChanges() {
        // console.log('1 - ' + marked(this.data));
        const md = marked.setOptions({});
        this.convertedData = md.parse(this.data);
        // this.convertedData = this.md.parse(this.data);
    }
}
