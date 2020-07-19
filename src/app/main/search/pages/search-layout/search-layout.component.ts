import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as UrlParse from 'url-parse';

@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss']
})
export class SearchLayoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.redirectHomeUnlessSearchQueryExists();
  }

  redirectHomeUnlessSearchQueryExists() {
    const urlParsed = new UrlParse(this.router.url, true);
    if (!urlParsed.query.hasOwnProperty('q')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
