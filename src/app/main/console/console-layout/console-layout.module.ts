import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationModule} from '@app/main/main-layout/navigation/navigation.module';
import { ConsoleLayoutComponent } from './console-layout.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  // declarations: [ConsoleLayoutComponent, FooterComponent, ],
  // imports: [
  //   CommonModule,
  //   NavigationModule,
  // ],
  // exports: [
    // NavigationModule,
  //   FooterComponent,
  //     ConsoleLayoutComponent,
  // ],
  // schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA,],
})
export class ConsoleLayoutModule { }
