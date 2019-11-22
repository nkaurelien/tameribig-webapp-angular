import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleLayoutComponent } from './console-layout/console-layout.component';
import { FooterComponent } from './console-layout/footer/footer.component';
import { NavigationModule } from './console-layout/navigation/navigation.module';
import { ParametersComponent } from './parameters/parameters.component';
import { SidenavModule } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [ConsoleLayoutComponent, FooterComponent, ParametersComponent],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    NavigationModule,
    SidenavModule,
  ]
})
export class ConsoleModule { }
