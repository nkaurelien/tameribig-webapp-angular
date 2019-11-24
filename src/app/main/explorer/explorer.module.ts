import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ExplorerComponent} from './explorer.component';
import {VideosExplorerComponent} from './videosexplorer/videosexplorer.component';

import {SlideshowModule} from 'ng-simple-slideshow';
import {NgxMasonryModule} from 'ngx-masonry';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreasExplorerComponent } from './creasexplorer/creasexplorer.component';
import { AudiosExplorerComponent } from './audiosexplorer/audiosexplorer.component';
import { ImagesExplorerComponent } from './imagesexplorer/imagesexplorer.component';

import {
    AudiosExplorerPath,
    CreasExplorerPath,
    ExplorerPath,
    ImagesExplorerPath,
    SearchresultPath,
    VideosExplorerPath,
    ImagePresenterUrl
} from './routes';
import { ImagesService } from '../@core/services/images.service';


const routes: Routes = [
    {
        path: ExplorerPath,
        component: ExplorerComponent,
        children: [
            // { path: '', redirectTo: 'images$', pathMatch: 'full' },
            {
                path: VideosExplorerPath,
                component: VideosExplorerComponent
            },
            {
                path: ImagesExplorerPath,
                component: ImagesExplorerComponent,
            },
            {
                path: AudiosExplorerPath,
                component: AudiosExplorerComponent
            },
            {
                path: CreasExplorerPath,
                component: CreasExplorerComponent
            },
            {
                path: SearchresultPath,
                component: SearchresultComponent
            },

            {
                path: ImagePresenterUrl,
                loadChildren: () => import('@modules/main/explorer/image/image.module').then(m => m.ImageModule)
            },
        ]
    }
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        ExplorerComponent,
        VideosExplorerComponent,
        CreasExplorerComponent,
        AudiosExplorerComponent,
        ImagesExplorerComponent,
        SearchresultComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SlideshowModule,
        LazyLoadImageModule,
        NgxMasonryModule,
        // NgbModule,

    ],
    exports: [RouterModule],
    providers: [
        ImagesService,
    ]
    
})
export class ExplorerModule {
}
