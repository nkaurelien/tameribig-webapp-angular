import {
    ButtonsModule,
    CollapseModule,
    DropdownModule,
    IconsModule,
    MDBBootstrapModulesPro,
    NavbarModule,
    SidenavModule,
    WavesModule
} from 'ng-uikit-pro-standard';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NavigationComponent} from './navigation.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SidenavModule,
        ButtonsModule,
        NavbarModule,
        WavesModule,
        IconsModule,
        CollapseModule,
        DropdownModule.forRoot(),
        MDBBootstrapModulesPro.forRoot(),
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
