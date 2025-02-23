import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from '@app/main/console/assets/layout/layout.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'images',
                loadChildren: () => import('@app/main/console/assets/image/images.module').then(m => m.ImagesModule)
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'images',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssetsRoutingModule { }
