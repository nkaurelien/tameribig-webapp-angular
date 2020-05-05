import {Injectable} from '@angular/core';
import marked from 'marked';

interface IMarkdownConfig {
    sanitize?: boolean;
    gfm?: boolean;
    breaks?: boolean;
    smartypants?: boolean;

    [key: string]: any;
}


@Injectable({
    providedIn: 'root',
})
export class MarkdownService {

    private md: any;

    constructor() {
        this.md = this.setConfig({});
    }

    parse(markdown: string): string {
        if (!markdown) {
            return '';
        }

        return this.md.parse(markdown);
    }

    setConfig(config?: IMarkdownConfig) {
        this.md = marked.setOptions(config || {});
    }
}
