import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {HomeLayoutComponent} from "./home-layout/home-layout.component";


const routes: Routes = [
  {
    'path': '',
    'component': HomeLayoutComponent,
    'children': [
      {
        'path': '',
        'component': HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
