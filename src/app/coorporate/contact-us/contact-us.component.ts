// declare function require(path: string);


import {Component, OnInit, Inject } from '@angular/core';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import {MDBModalRef, MDBModalService} from 'ng-uikit-pro-standard';
import { Router, NavigationEnd } from '@angular/router';

import {ContactUsModalComponent} from './_modals/contact-us-modal.component';
import { SeoService } from '@core/services/seo.service';


@Component({

  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  private contactModalRef: MDBModalRef;

  constructor(
      private _router: Router,
      private seo: SeoService,
      private modalService: MDBModalService,
      @Inject(WINDOW) private window: Window,
      @Inject(LOCAL_STORAGE) private localStorage: any,
  ) {

  }


  ngOnInit() {


  }

  showContact() {
    const modalOptions = {
      class: 'modal-lg modal-top',
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      containerClass: 'right',
      animated: true
    };

    this.contactModalRef = this.modalService.show(ContactUsModalComponent, modalOptions);
  }


}
