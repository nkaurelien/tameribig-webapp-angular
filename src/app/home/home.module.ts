import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeLayoutComponent} from './home-layout/home-layout.component';
import {HomeRoutingModule} from './home-routing.module';
import {SearcherComponent} from './searcher/searcher.component';
import {HexagoneComponent} from './hexagone/hexagone.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbTypeaheadModule,
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
