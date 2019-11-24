// declare function require(path: string);

import {Component} from '@angular/core';
import {environment} from '@environments/environment';
import {MDBModalRef} from 'ng-uikit-pro-standard';
import { ContactService } from '../../../_services/contact.service';

@Component({
    selector: 'app-faq-modal',
    templateUrl: './faq-modal.component.html' ,
    styles: [`
        .overflow-y {
            overflow-y: auto
        }
    `]
})


export class FaqModalComponent  {

  logo = environment.logo;

  constructor(
      private contact: ContactService,
      public modalRef: MDBModalRef,
  ) {
    //
  }

  askViaWhatsapp() {
    this.contact.askViaWhatsapp('<VOTRE_MESSAGE_ICI>').then( _ => {});
  }
}
