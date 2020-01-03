// Angular
import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// CRUD
import { InterceptService } from '@core/_base/crud';
// Module components
import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './components/auth-notice/auth-notice.component';
import { AuthRoutingModule } from './auth-routing.module'; 
// Auth
import { authReducer } from './_reducers/auth.reducers';
import { AuthEffects } from './_effects/auth.effects';
import { AuthService } from './_services';
import { AuthFirebaseService } from './_services';
import { AuthGuard } from './_guards/auth.guard';
import {
	ButtonsModule,
	CardsModule,
	WavesModule,
	IconsModule,
	CheckboxModule,
	InputsModule, PreloadersModule
} from 'ng-uikit-pro-standard';
import {RegisterCompleteComponent} from "./components/register-complete/register-complete.component";


@NgModule({
	schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
	imports: [
		CommonModule,
		AuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		// MatButtonModule,
		// MatInputModule,
		// MatFormFieldModule,
		// MatCheckboxModule,
		InputsModule,
		ButtonsModule,
		CardsModule,
		CheckboxModule,
		WavesModule,
		IconsModule,
		TranslateModule.forChild(),
		PreloadersModule,
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
	],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		RegisterCompleteComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthFirebaseService,
				AuthService,
				AuthGuard
			]
		};
	}
}
