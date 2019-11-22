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
                    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
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
