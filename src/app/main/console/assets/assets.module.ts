import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetsRoutingModule} from './assets-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {CoreModule} from "@core/core.module";



@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        AssetsRoutingModule,
        // CoreModule.forRoot(),
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AssetsModule { }
