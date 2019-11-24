import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TabsetComponent } from 'ng-uikit-pro-standard';
import {ActivatedRoute} from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
// import {} from '@ng-toolkit/universal/';

// declare var particlesJS: any;
import 'jarallax';
import {ScriptService} from 'ngx-script-loader';
import {concat} from 'rxjs';
import {ContactService} from '../_services/contact.service';

declare var jarallax: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, AfterViewInit {

  @ViewChild('staticTabs', {static: true}) staticTabs: TabsetComponent;
  private fragment: string;
  private jarallaxLazyLoaded: boolean;

  tabsIndex = {
    'how-it-work': 1,
    'become-delivery-man': 2,
    'recrutment': 2,
  };

  constructor(
      private _title: Title,
      private _meta: Meta,
      private route: ActivatedRoute,
      private scriptService: ScriptService,
      private contact: ContactService,
      @Inject(WINDOW) private window: Window,
  ) {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngOnInit() {
    this._title.setTitle('Foire aux questions');
    this._meta.updateTag({ name: 'description', content: 'Foire aux questions ' });



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


    this.staticTabs.setActiveTab( this.tabsIndex[this.fragment] || 1);

  }

  becomeDeliveryMan() {
    this.contact.becomeDeliveryMan().then( _ => {});
  }

}
