import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {AuthenticationService} from '../_services/index';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authentication: AuthenticationService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authentication.firebaseUser.pipe(
            take(1),
            // tap(user => { console.log( 'user', user); }),
            map(user => !!user),
            tap(loggedIn => {
                // console.log('loggedIn', loggedIn);
                if (!loggedIn) {
                    this.router.navigateByUrl('/auth/login', { queryParams: { returnUrl: state.url } });
                }
            })
        );
    }
}
