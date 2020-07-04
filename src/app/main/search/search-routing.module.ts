import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchResultsComponent} from './pages/search-results/search-results.component';
import {SearchLayoutComponent} from './pages/search-layout/search-layout.component';


const routes: Routes = [

  {
    path: '',
    component: SearchLayoutComponent,
    children: [
      {
        path: ':active_search_tab', // images, audio, crea, etc..
        component: SearchResultsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
