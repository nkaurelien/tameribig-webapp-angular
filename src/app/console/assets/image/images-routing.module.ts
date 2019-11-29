import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageComponent} from './image.component';
import {ImageAddComponent} from './image-add/image-add.component';


const routes: Routes = [
    {
        path: '',
        component: ImageComponent,
        children: [
            {
                path: 'add',
                component: ImageAddComponent,
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImagesRoutingModule { }
