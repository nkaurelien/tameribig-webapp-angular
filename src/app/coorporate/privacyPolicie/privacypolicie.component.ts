import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';




// declare var particlesJS: any;

@Component({
  selector: 'app-privacypolicie',
  templateUrl: './privacypolicie.component.html',
  styleUrls: ['./privacypolicie.component.scss']
})
export class PrivacyPolicieComponent implements OnInit {

  constructor(
    private _title: Title,
    private _meta: Meta
    ) {
  
  }

  ngOnInit() {
    this._title.setTitle('Politique de confidentialité');
    this._meta.updateTag({ name: 'description', content: 'Politique de confidentialité!' });

  }

}
