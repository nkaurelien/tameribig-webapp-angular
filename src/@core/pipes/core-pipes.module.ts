import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPipe} from './search.pipe';
import {FilterArrayPipe} from './array/filter.pipe';


@NgModule({
    declarations: [
        SearchPipe,
        FilterArrayPipe,
    ],
    exports: [
        SearchPipe,
        FilterArrayPipe,
    ],
    imports: [
        CommonModule
    ]
})
export class CorePipesModule {
}
