import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from 'ng-uikit-pro-standard';
import { AnimatedLikeComponent } from './animated-like.component';



@NgModule({
  declarations: [
    AnimatedLikeComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
  ],
  exports: [
    AnimatedLikeComponent,
  ]
})
export class AnimatedLikeModule { }
