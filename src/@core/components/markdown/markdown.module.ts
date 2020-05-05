import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownComponent} from './markdown.component';
import {MarkdownService} from './markdown.service';


@NgModule({
    declarations: [
        MarkdownComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        MarkdownService,
    ],
    exports: [
        MarkdownComponent,
    ]
})
export class MarkdownModule {
}
