import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { ParametersComponent } from './parameters/parameters.component';
import { ConsoleLayoutModule } from './console-layout/console-layout.module';
import {NavigationModule} from './console-layout/navigation/navigation.module';
import {SidenavModule} from 'ng-uikit-pro-standard';
import {ConsoleLayoutComponent} from './console-layout/console-layout.component';
import {FooterComponent} from './console-layout/footer/footer.component';
import {MarkdownModule} from '@core/components/markdown/markdown.module';
import {CoreModule} from '@core/core.module';


@NgModule({
    declarations: [ConsoleLayoutComponent, FooterComponent],
    imports: [
        CommonModule,
        ConsoleRoutingModule,
        // ConsoleLayoutModule,
        NavigationModule,
        SidenavModule,
        MarkdownModule,
        // CoreModule.forRoot(),
    ],
    exports: [
        ConsoleLayoutModule,
    ],
})
export class ConsoleModule { }
