import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/auth/_services';
import {AuthFirebaseService} from '@core/auth/_services';
import {Helpers} from '@core/helpers';

@Component({
    selector: 'app-logout',
    template: '',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(private router: Router,
                private auth: AuthService,
                private fireAuth: AuthFirebaseService) {
    }

    ngOnInit(): void {
        Helpers.setLoading(true);
        // reset login status
        this.auth.fireAuth.fireLogout().then(_ => {
            this.router.navigate(['/auth']);
            Helpers.setLoading(false);
        });

    }
}
