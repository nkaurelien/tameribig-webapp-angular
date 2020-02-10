import {AuthFirebaseService} from '@core/auth/_services/auth-firebase.service';
import {tap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  clicked: boolean;
    authUser: firebase.User;
    unsubscribe = new Subject<boolean>();

    constructor(
        private cdr: ChangeDetectorRef,
        private afAuth: AuthFirebaseService
    ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

    get authenticated() {
        return this.authUser && this.authUser.email !== undefined;
    }

  ngOnInit() {

      /* CHECK AUTH STATE */
      this.afAuth.fireUser().pipe(
          tap((user: firebase.User) => {
              if (!!user) {
                  this.authUser = user;
                  console.log({user});
              }
          }),
          takeUntil(this.unsubscribe)
      ).subscribe();
  }

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }

}
