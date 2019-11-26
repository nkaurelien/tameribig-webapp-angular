import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coorporate-layout',
  templateUrl: './coorporate-layout.component.html',
  styleUrls: ['./coorporate-layout.component.scss']
})
export class CoorporateLayoutComponent implements OnInit {

  specialPage = false;

  private specialPages: any[] = [
    // '/home',
  ];

  private currentUrl = '';

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.router.events.subscribe((route: any) => {
      if (route.routerEvent) {
        this.currentUrl = route.routerEvent.url;
      } else {
        this.currentUrl = route.url;
      }

      if (this.currentUrl !== undefined) {
        // console.log('this.currentUrl', this.currentUrl, this.specialPage);
        this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
      }
    });

  }


  ngOnInit(): void {

  }

  goBack(): void {
    this.location.back();
  }
}
