import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TabsetComponent } from 'ng-uikit-pro-standard';
import {ActivatedRoute} from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import {ScriptService} from 'ngx-script-loader';
import 'jarallax';
import {concat} from 'rxjs';

declare var jarallax: any;


// declare var particlesJS: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, AfterViewInit {

  @ViewChild('staticTabs', {static: true}) staticTabs: TabsetComponent;
  private fragment: string;
  private jarallaxLazyLoaded: boolean;


  constructor(
      private _title: Title,
      private _meta: Meta,
      private route: ActivatedRoute,
      private scriptService: ScriptService,
      @Inject(WINDOW) private window: Window,
  ) {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.jarallaxLazyLoaded = false;
  }

  ngOnInit() {
    this._title.setTitle('A propos de nous');
    this._meta.updateTag({ name: 'description', content: 'A propos de nous' });

    // this.staticTabs.setActiveTab(3);


  }

  ngAfterViewInit(): void {
    try {
      this.window.document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
    concat(
        this.scriptService.loadScript('/lazy-loaded-jarallax.min.js'),
        this.scriptService.loadScript('/lazy-loaded-jarallax-element.min.js'),
        this.scriptService.loadScript('/lazy-loaded-jarallax-video.min.js'),
    ).subscribe(() => {
      this.jarallaxLazyLoaded = true;
      if (this.jarallaxLazyLoaded) {
        jarallax(this.window.document.querySelectorAll('.jarallax'), {
          speed: 0.2,
          disableParallax:  () => {
            return /iPad|iPhone|iPod|Android/.test(this.window.navigator.userAgent);
          },
          disableVideo: () => {
            return /iPad|iPhone|iPod|Android/.test(this.window.navigator.userAgent);
          }
        });
      }
    });
  }

}
