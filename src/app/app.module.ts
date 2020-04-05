
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import { MDBSpinningPreloader, ToastModule, MDBModalService, ModalModule, IconsModule } from 'ng-uikit-pro-standard';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '@environments/environment';
import { ErrorModule } from './errors/error.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from '@core/reducers';
import { AuthService } from '@core/auth';
import { HttpUtilsService } from '@core/_base/crud';
// import { AuthModule } from './auth2/auth.module';
import { AuthModule } from '@core/auth';
import { CoreModule } from '@core/core.module';
import { ContactUsModalComponent } from './coorporate/contact-us/_modals/contact-us-modal.component';
import { FaqModalComponent } from './coorporate/faq/modals/faq/faq-modal.component';
import { ContactUsModule } from './coorporate/contact-us/contact-us.module';
import { FaqModule } from './coorporate/faq/faq.module';
import { SplashScreenService, DataTableService, KtDialogService, PageConfigService, MenuConfigService, LayoutRefService, LayoutConfigService } from 'src/@core/_base/layout';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceDetectorModule } from 'ngx-device-detector';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ContactUsModule,
    FaqModule,
    AuthModule.forRoot(),
    CoreModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers: metaReducers  }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),

      ErrorModule,
    
    FormsModule,
    IconsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastModule.forRoot({
      positionClass: 'md-toast-bottom-center',
      maxOpened: 2,
    }),
    NgtUniversalModule,
    TranslateModule.forRoot(),
    DeviceDetectorModule.forRoot(),

    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
  ],
  providers: [MDBSpinningPreloader,

    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    KtDialogService,
    DataTableService,
    SplashScreenService,
    // AuthenticationService,
    // AuthService,
    HttpUtilsService,
    MDBModalService,
  ],
  entryComponents: [
    ContactUsModalComponent,
    FaqModalComponent,
  ],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
