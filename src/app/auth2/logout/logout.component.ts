import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {Helpers} from '@core/helpers';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(private _router: Router,
                private _authService: AuthenticationService) {
    }

    ngOnInit(): void {
        Helpers.setLoading(true);
        // reset login status
        this._authService.logout().then( _ => this._router.navigate(['/auth']) );

    }
}
