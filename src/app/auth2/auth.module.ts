import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseRequestOptions, HttpModule} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {AuthRoutingModule} from './auth-routing.routing';
import {AlertComponent} from './_directives/alert.component';
import {AuthGuard} from './_guards/auth.guard';
import {AlertService} from './_services/alert.service';
import {AuthenticationService} from './_services/authentication.service';
import {UserService} from './_services/user.service';
import {fakeBackendProvider} from './_helpers/index';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './TokenInterceptor';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Module components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import { LogoutComponent } from './logout/logout.component';

// Auth
import { AuthEffects,  authReducer, AuthService } from '../auth/index';
import { InterceptService } from '../_base/crud/index';


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
    HttpModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
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
    // api backend simulation
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
  ],
  exports: [AuthComponent],
  entryComponents: [AlertComponent],
})

export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
          AuthenticationService,
          AuthGuard
      ]
    };
  }
}
