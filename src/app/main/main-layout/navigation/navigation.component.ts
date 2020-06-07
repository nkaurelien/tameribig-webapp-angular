import {AuthFirebaseService} from '@core/auth/_services/auth-firebase.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';

import * as $ from 'jquery';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CollapseComponent} from "ng-uikit-pro-standard";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    // styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy, AfterViewInit {

    clicked: boolean;
    authUser: firebase.User;
    unsubscribe = new Subject<boolean>();
    @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
    @ViewChild('navbarToggler', {static: false}) navbarToggler;

    constructor(
        private cdr: ChangeDetectorRef,
        private afAuth: AuthFirebaseService,
        private deviceService: DeviceDetectorService
    ) {
        this.clicked = this.clicked === undefined ? false : true;
    }

    get authenticated() {
        return this.authUser && this.authUser.email !== undefined;
    }

    get username() {
        let username = '';
        if (this.authUser && this.authUser.email !== undefined) {
            username = this.authUser.email.split('@')[0];
        }
        return this.authUser && this.authUser.displayName !== undefined && this.authUser.displayName !== null ?
            this.authUser.displayName : username;
    }

    // @HostListener('window:resize', ['$event'])
    // onWindowResize(event: Event) {
    //     const currentTarget = event.currentTarget as Window;
    //     const innerWidth = currentTarget.innerWidth;
    //
    //     const btn = this.navbarToggler.nativeElement as HTMLButtonElement;
    //     // btn.click();
    //
    //     // const deviceInfo = this.deviceService.getDeviceInfo();
    //     // console.log('win res', event, 'deviceInfo', deviceInfo);
    // }

    ngOnInit() {

        /* CHECK AUTH STATE */
        this.afAuth.fireUser().pipe(
            tap((user: firebase.User) => {
                if (!!user) {
                    this.authUser = user;
                    // console.log({user});
                }
            }),
            takeUntil(this.unsubscribe)
        ).subscribe();
    }

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }


    ngAfterViewInit(): void {
        this.initNavbar();
        this.closeCollapses();
    }

    closeCollapses() {
        Promise.resolve().then(() => {
            this.collapses.forEach((collapse: CollapseComponent) => {
                collapse.hide();
            });
        });
    }
    initNavbar() {

        $(() => {
            const header = $('.start-style');
            $(window).scroll(() => {
                const scroll = $(window).scrollTop();

                if (scroll >= 10) {
                    header.removeClass('start-style').addClass('scroll-on');
                } else {
                    header.removeClass('scroll-on').addClass('start-style');
                }
            });
        });

        // Animation

        $(document).ready(() => {
            $('body.hero-anime').removeClass('hero-anime');
        });

        // Menu On Hover

        $('body').on('mouseenter mouseleave', '.nav-item', (e) => {
            if ($(window).width() > 750) {
                const _d = $(e.target).closest('.nav-item');
                _d.addClass('show');
                setTimeout(() => {
                    _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
                }, 1);
            }
        });

        // Switch light/dark

        $('#switch').on('click', () => {
            if ($('body').hasClass('dark')) {
                $('body').removeClass('dark');
                $('#switch').removeClass('switched');
                $('#navbar-logo').show();
                $('#navbar-logo-inverse').hide();
            } else {
                $('body').addClass('dark');
                $('#switch').addClass('switched');
                $('#navbar-logo').hide();
                $('#navbar-logo-inverse').show();
            }
        });
    }
}
