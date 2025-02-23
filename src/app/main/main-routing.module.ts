import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from '~src/app/main/main-layout/main-layout.component';


const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: 'home',
                    loadChildren: () => import('@modules/main/home/home.module').then(m => m.HomeModule)
        },
        {
          path: 'partner',
          loadChildren: () => import('@modules/main/partner/partner.module').then(m => m.PartnerModule)
        },
        {
          path: 'explorer',
          loadChildren: () => import('@modules/main/explorer/explorer.module').then(m => m.ExplorerModule)
        },
        {
          path: 'search',
          loadChildren: () => import('@modules/main/search/search.module').then(m => m.SearchModule)
        },
        {
          path: 'topics',
          loadChildren: () => import('@modules/main/category/category.module').then(m => m.CategoryModule)
        },
        {
          path: 'help',
          loadChildren: () => import('@modules/main/help/help.module').then(m => m.HelpModule)
        },
        {
          path: 'network',
          loadChildren: () => import('@modules/main/network/network.module').then(m => m.NetworkModule),
                },
                {
                    path: 'console',
                    loadChildren: () => import('@modules/main/console/console.module').then(m => m.ConsoleModule),
                },
                {
                    path: '',
                    redirectTo: 'home',
                    pathMatch: 'full'
                },
                {
                    path: '**',
                    redirectTo: '404',
                    pathMatch: 'full'
                },
            ]
        },
        {
            path: '**',
            redirectTo: 'home',
            pathMatch: 'full'
        }
]
;

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
