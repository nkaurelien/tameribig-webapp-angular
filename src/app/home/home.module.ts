import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeLayoutComponent} from './home-layout/home-layout.component';
import {HomeRoutingModule} from "./home-routing.module";
import {SearcherComponent} from "./searcher/searcher.component";
import {HexagoneComponent} from "./hexagone/hexagone.component";


@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
    ],
    exports: [
        HomeRoutingModule,
        SearcherComponent,
    ],
    declarations: [
        HomeComponent,
        HomeLayoutComponent,
        SearcherComponent,
        HexagoneComponent,
    ],
})
export class HomeModule {
}
