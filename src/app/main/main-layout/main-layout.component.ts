import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  specialPage = false;

  private specialPages: any[] = [
    '/home',
    '/login',
    '/register',
    '/registered',
    '/lock',
    '/reset-password',
    '/reseted-password',
    '/new-password',
    '/password-code-verification',
    '/reset-email-sended',
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
      console.log('this.currentUrl', this.currentUrl);

      this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
    });
   
  }


  ngOnInit(): void {

  }

  goBack(): void {
    this.location.back();
  }
}
