
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
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
import { AuthenticationService } from './auth2/_services';
import { ScriptLoaderService } from 'src/@core/services/script-loader.service';
import { AuthModule } from './auth2/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(),


    StoreModule.forRoot(reducers, { metaReducers: metaReducers  }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),

    ErrorModule,
    
    FormsModule,
    HttpClientModule,
    ToastModule.forRoot({
      positionClass: 'md-toast-bottom-center',
      maxOpened: 2,
    }),
    // MDBBootstrapModulesPro.forRoot(),
    NgtUniversalModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    
    // AgmCoreModule.forRoot({
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
    //   apiKey: 'Your_api_key'
    // })
  ],
  providers: [MDBSpinningPreloader,

    // AuthenticationService,
    AuthService,
    HttpUtilsService,
    ScriptLoaderService,
  ],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
