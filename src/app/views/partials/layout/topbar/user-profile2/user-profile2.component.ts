// Angular
import {Component, OnInit} from '@angular/core';
// RxJS
import {Observable} from 'rxjs';
// NGRX
import {select, Store} from '@ngrx/store';
// State
import {AppState} from '@core/reducers';
import {currentUser, Logout, User} from '@core/auth';

@Component({
    selector: 'kt-user-profile2',
    templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {
    // Public properties
    user$: Observable<User>;

    /**
     * Component constructor
     *
     * @param store: Store<AppState>
     */
    constructor(private store: Store<AppState>) {
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit(): void {
        this.user$ = this.store.pipe(select(currentUser));
    }

    /**
     * Log out
     */
    logout() {
        this.store.dispatch(new Logout());
    }
}
