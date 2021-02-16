import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeLayoutComponent} from './home-layout/home-layout.component';
import {HomeRoutingModule} from './home-routing.module';
import {HexagoneComponent} from './hexagone/hexagone.component';
import {RouterModule} from '@angular/router';
import {CategoriesService} from '../@core/services/categories.service';
import {ImagesService} from '../@core/services/images.service';
import {IconsModule} from 'ng-uikit-pro-standard';
import {SearchSharedModule} from '@app/main/search';


@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    RouterModule,
    IconsModule,
    SearchSharedModule,
  ],
    exports: [
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent,
        HomeLayoutComponent,
        HexagoneComponent,
    ],
    providers: [
        CategoriesService,
        ImagesService
    ],
})
export class HomeModule {
}
