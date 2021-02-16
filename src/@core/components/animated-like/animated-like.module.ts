import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsModule, TooltipModule} from 'ng-uikit-pro-standard';
import {AnimatedLikeComponent} from './animated-like.component';


@NgModule({
  declarations: [
    AnimatedLikeComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
      TooltipModule,
  ],
  exports: [
    AnimatedLikeComponent,
  ]
})
export class AnimatedLikeModule { }
