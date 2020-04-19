import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { ParametersComponent } from './parameters/parameters.component';
import { ConsoleLayoutModule } from './console-layout/console-layout.module';
import {NavigationModule} from './console-layout/navigation/navigation.module';
import {SidenavModule} from 'ng-uikit-pro-standard';
import {ConsoleLayoutComponent} from './console-layout/console-layout.component';
import {FooterComponent} from './console-layout/footer/footer.component';


@NgModule({
    declarations: [ConsoleLayoutComponent, FooterComponent],
    imports: [
        CommonModule,
        ConsoleRoutingModule,
        // ConsoleLayoutModule,
        NavigationModule,
        SidenavModule,
    ],
    exports: [
        ConsoleLayoutModule,
    ],
})
export class ConsoleModule { }
