import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.routing';
import {AlertComponent} from './_directives/alert.component';
import {AuthGuard} from './_guards/auth.guard';
import {AlertService} from './_services/alert.service';
import {AuthenticationService} from './_services/authentication.service';
import {UserService} from './_services/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
// Module components
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthNoticeComponent} from './auth-notice/auth-notice.component';
import {LogoutComponent} from './logout/logout.component';
// Auth
import {AuthEffects, authReducer} from '@core/auth/index';
import {InterceptService} from '@core/_base/crud/index';
import {ButtonsModule, CardsModule, IconsModule, WavesModule} from 'ng-uikit-pro-standard';

// import {BaseRequestOptions, HttpModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AuthComponent,
    AlertComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AuthNoticeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ButtonsModule,
    CardsModule,
    WavesModule,
    IconsModule,
    // MatButtonModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatCheckboxModule,
    TranslateModule.forChild(),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    AlertService,
    AuthenticationService,
    UserService,
    // BaseRequestOptions,
  ],
  exports: [AuthComponent],
  entryComponents: [AlertComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})

export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthenticationService,
        AuthGuard
      ]
    };
  }
}
