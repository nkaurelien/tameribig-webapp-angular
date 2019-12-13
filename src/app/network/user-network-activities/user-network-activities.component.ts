import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {UserService} from '@app/auth2/_services';
import {User} from '@core/auth';


@Component({
  selector: 'app-user-network-activities',
  templateUrl: './user-network-activities.component.html',
  styleUrls: ['./user-network-activities.component.scss']
})
export class UserNetworkActivitiesComponent implements OnInit, OnDestroy {
    private paramMapSub: Subscription;
    private unsubscribe = new Subject<any>();
    private username: string;
    user: User;
    defaultImageAvatar = '/assets/images/icons/masque-afrique.jpg';

  constructor(
      private route: ActivatedRoute,
      private userService: UserService,

  ) {
      this.user = new User({});
  }

  ngOnInit() {

      this.paramMapSub = this.route.paramMap.pipe(
          // takeUntil(this.unsubscribe)
      ).subscribe(params => {
          this.username = params.get('userid');

          console.log('uname', this.username);
          this.userService.getByUsername(this.username).subscribe(resp => {
              console.log(resp);
              this.user = new User(resp);

          });
      });
  }

  ngOnDestroy() {
      this.unsubscribe.next();
      this.unsubscribe.complete();
  }

}
