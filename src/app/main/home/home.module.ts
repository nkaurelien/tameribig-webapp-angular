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
import {CategoriesService} from '../@core/services/categories.service';
import {ImagesService} from '../@core/services/images.service';
import {IconsModule, InputsModule} from "ng-uikit-pro-standard";


@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbTypeaheadModule,
        IconsModule,
        InputsModule,
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
    providers: [
        CategoriesService,
        ImagesService
    ],
})
export class HomeModule {
}
