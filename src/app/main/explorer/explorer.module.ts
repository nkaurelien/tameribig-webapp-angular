import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ButtonsModule, CarouselModule, IconsModule, InputsModule, WavesModule} from 'ng-uikit-pro-standard';
import {ExplorerComponent} from './explorer.component';
import {VideosExplorerComponent} from './videosexplorer/videosexplorer.component';

import {LazyLoadImageModule} from 'ng-lazyload-image';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreasExplorerComponent} from './creasexplorer/creasexplorer.component';
import {AudiosExplorerComponent} from './audiosexplorer/audiosexplorer.component';
import {ImagesExplorerComponent} from './imagesexplorer/imagesexplorer.component';

import {AudiosExplorerPath, CreasExplorerPath, ExplorerPath, ImagesExplorerPath, VideosExplorerPath} from './routes';
import {ImagesService} from '../@core/services/images.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {AnimatedLikeModule} from 'src/@core/components/animated-like/animated-like.module';
import {AvatarModule} from 'ngx-avatar';

const routes: Routes = [
  {
    path: ExplorerPath,
    component: ExplorerComponent,
    children: [
      // { path: '', redirectTo: 'images$', pathMatch: 'full' },
      {
        path: VideosExplorerPath,
        component: VideosExplorerComponent,
      },
      {
        path: ImagesExplorerPath,
        component: ImagesExplorerComponent,
        loadChildren: () => import('@modules/main/explorer/image/image.module').then(m => m.ImageModule)
        // children: [
        //     {
        //         path: '',
        //         loadChildren: () => import('@modules/main/explorer/image/image.module').then(m => m.ImageModule)
        //     },
        // ],
      },
      {
        path: AudiosExplorerPath,
        component: AudiosExplorerComponent
      },
      {
        path: CreasExplorerPath,
        component: CreasExplorerComponent
      },

      // {
      //     path: ImagesExplorerPath,
      //     loadChildren: () => import('@modules/main/explorer/image/image.module').then(m => m.ImageModule)
      // },
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

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
    CarouselModule,
    // NgxMasonryModule,
    NgMasonryGridModule,
    InfiniteScrollModule,
    IconsModule,
    WavesModule,
    InputsModule,
    ButtonsModule,
    AnimatedLikeModule,
    AvatarModule,
    // NgbModule,

  ],
  exports: [RouterModule],
  providers: [
    ImagesService,
  ]

})
export class ExplorerModule {
}
