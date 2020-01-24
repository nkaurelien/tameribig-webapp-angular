// Angular
import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from '@core/_base/layout';
// Auth
import { AuthNoticeService } from '../auth-notice/auth-notice.service';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;

	/**
	 * Component constructor
	 *
	 * @param el
	 * @param render
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 * @param translationService: TranslationService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private el: ElementRef,
		private render: Renderer2,
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		private translationService: TranslationService,
		private splashScreenService: SplashScreenService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo();
		this.translationService.loadTranslations({
			lang: 'fr',
			data: {
				'HELLO': 'Salut {{value}}',
				'AUTH.REGISTER.TITLE': 'Inscription',
				'AUTH.GENERAL.FORGOT_BUTTON': 'Mot de passe oublié',
				'AUTH.GENERAL.BACK_BUTTON': 'revenir',
				'AUTH.GENERAL.SUBMIT_BUTTON': 'Soumettre',

				'AUTH.LABEL.EMAIL': 'Tape ton email',
				'AUTH.LABEL.FULLNAME': 'Tape ton nom et prénom',
				'AUTH.LABEL.PASSWORD': 'Tape ton mot de passe',
				'AUTH.LABEL.CONFIRM_PASSWORD': 'Confirme ton mot de passe',

				'AUTH.INPUT.EMAIL': 'Email',
				'AUTH.INPUT.PASSWORD': 'Mot de passe',
				'AUTH.INPUT.CONFIRM_PASSWORD': 'Confirmer le mot de passe',

				'AUTH.VALIDATION.CONFIRM_PASSWORD_NOT_MATCH': 'Le mot de passe ne correspond pas',
				'AUTH.VALIDATION.REQUIRED_FIELD': 'Ce champ est obligatoire',
				'AUTH.VALIDATION.MIN_LENGTH_FIELD': 'Trop long',
				'AUTH.VALIDATION.MAX_LENGTH_FIELD': 'Trop court',

			}
		});
		// this.splashScreenService.hide();

		// load default styles
		// this.loadCSS('./metronic/css/demo1/style.bundle.css');
	}

	/**
	 * Load CSS for this specific page only, and destroy when navigate away
	 * @param styleUrl
	 */
	private loadCSS(styleUrl: string) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement('link');
			styleElement.href = styleUrl;
			styleElement.type = 'text/css';
			styleElement.rel = 'stylesheet';
			styleElement.onload = resolve;
			this.render.appendChild(this.el.nativeElement, styleElement);
		});
	}
}
