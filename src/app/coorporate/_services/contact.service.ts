import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WINDOW} from "@ng-toolkit/universal";



@Injectable()
export class ContactService {


  whatsappPhone = '237654306774';

  constructor(

      @Inject(WINDOW) private window: Window,
      private http: HttpClient,
      ) { }

  contactAdmin(contact) {

    return this.http.post<any>('RouteContact', contact);

  }


  sendWhatsappMessage(contact) {

    // let message = `Je souhaiterais effectué une course, \r\n`;
    let message = `Je souhaite vous contacter, \r\n`;
    for (const key in contact) {

      message += `\t | ${key} = ${contact[key]} \r\n`;
      console.log({contact, message, key});

    }

    // let contact = mapKeys(contact, key => `${key} = ${contact[key]}`);
    message = encodeURIComponent(message);
    const urlwhat = `https://api.whatsapp.com/send?phone=${this.whatsappPhone}&text=${message}`;
    this.window.open(urlwhat, '_blank');
    return Promise.resolve();
    // return this.http.get<any>(urlwhat, '').toPromise;

  }


  askViaWhatsapp(question) {

    // let message = `Je souhaiterais effectué une course, \r\n`;
    let message = `Je souhaite vous savoir ceci, \r\n *${question}*`;

    // let contact = mapKeys(contact, key => `${key} = ${contact[key]}`);
    message = encodeURIComponent(message);
    const urlwhat = `https://api.whatsapp.com/send?phone=${this.whatsappPhone}&text=${message}`;
    this.window.open(urlwhat, '_blank');
    return Promise.resolve();
    // return this.http.get<any>(urlwhat, '').toPromise;

  }

  becomeDeliveryMan() {

    // let message = `Je souhaiterais effectué une course, \r\n`;
    let message = `Je correspond aux exigences et je postule au poste de Coursier, \r\n `;
    const pieces = [
      '*Ci-joints:* ',
      'Ma CNI,',
      'La photo de ma moto,',
      'Ma lettre de motivation,',
      'Mon plan de localisation',
    ];
    message += '```';
    message += pieces.join('\r\n ');
    message += '```';

    // let contact = mapKeys(contact, key => `${key} = ${contact[key]}`);
    message = encodeURIComponent(message);
    const urlwhat = `https://api.whatsapp.com/send?phone=${this.whatsappPhone}&text=${message}`;
    this.window.open(urlwhat, '_blank');
    return Promise.resolve();
    // return this.http.get<any>(urlwhat, '').toPromise;

  }

}
