import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    ButtonsModule,
    InputsModule,
    InputUtilitiesModule,
    WavesModule,
    CardsModule,
    IconsModule,
    AccordionModule,
    TabsModule
} from 'ng-uikit-pro-standard';
import {ProfileLayoutComponent} from './profile-layout/profile-layout.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {MarkdownModule} from "@core/components/markdown/markdown.module";
import {CoreDirectivesModule} from "@core/directives/core-directives.module";

const routes: Routes = [
    {
        path: '',
        component: ProfileLayoutComponent,
        children: [
            {
                path: '',
                component: ProfileComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        InputsModule,
        InputUtilitiesModule,
        ButtonsModule,
        WavesModule,
        CardsModule,
        IconsModule,
        AccordionModule,
        TabsModule,
        LazyLoadImageModule,
        MarkdownModule,
        IconsModule,
        CoreDirectivesModule,
    ], exports: [
        RouterModule
    ], declarations: [
        ProfileComponent,
        ProfileLayoutComponent
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {


}
