import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageComponent} from './image.component';
import {ImageAddComponent} from './image-add/image-add.component';
import {ImageUploadSourceComponent} from './image-upload-source/image-upload-source.component';
import {ImageUploadPictureComponent} from './image-upload-picture/image-upload-picture.component';
import {ImageEditComponent} from './image-edit/image-edit.component';


const routes: Routes = [
    {
        path: '',
        component: ImageComponent,
        children: [
            {
                path: 'add',
                component: ImageAddComponent,
            },
            {
                path: ':id/upload-picture',
                component: ImageUploadPictureComponent,
            },
            {
                path: ':id/upload-source',
                component: ImageUploadSourceComponent,
            },
            {
                path: ':id/edit',
                component: ImageEditComponent,
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImagesRoutingModule { }
