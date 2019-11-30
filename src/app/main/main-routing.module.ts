import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
                    path: 'topics',
                    loadChildren: () => import('@modules/main/category/category.module').then(m => m.CategoryModule)
                },
                {
                    path: 'help',
                    loadChildren: () => import('@modules/main/help/help.module').then(m => m.HelpModule)
                },
                {
                    path: 'uploader',
                    loadChildren: () => import('@modules/main/uploader/uploader.module').then(m => m.UploaderModule)
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
