import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './category.component';
import {CategoryDetailComponent} from './detail/category-detail.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    'path': '',
    'component': LayoutComponent,
    'children': [
      {
        'path': '',
        'component': CategoryComponent,
      },
      {
        'path': ':slug',
        'component': CategoryDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
    InfiniteScrollModule
  ], exports: [
    RouterModule,
  ], declarations: [
    CategoryComponent,
    CategoryDetailComponent,
    LayoutComponent,
  ],
})
export class CategoryModule {
}
