
import {MDBBootstrapModulesPro, SidenavModule} from 'ng-uikit-pro-standard';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SidenavModule,
        MDBBootstrapModulesPro.forRoot()
    ],
    declarations: [
        NavigationComponent,
    ],
    exports: [
        NavigationComponent
    ],
    providers: []
})
export class NavigationModule {

}
