import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {AuthService, User} from '@core/auth';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-dashboad-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  user: User;
  defaultImageAvatar = '/assets/images/icons/masque-afrique.jpg';
  public section = 'monitoring';
  private paramMapSub: Subscription;
  private unsubscribe = new Subject<any>();
  private username: string;

  constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private cdr: ChangeDetectorRef,
  ) {
    this.user = new User({});
  }

  ngOnInit() {

    this.paramMapSub = this.route.paramMap.pipe(
        // takeUntil(this.unsubscribe)
    ).subscribe(params => {
      this.username = params.get('userid');

      this.authService.getUserByUsername(this.username).subscribe(resp => {
        console.log(resp);
        this.user = new User(resp);

      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  showSection(tag: string) {
    this.section = tag;
    this.cdr.detectChanges();
  }
}
