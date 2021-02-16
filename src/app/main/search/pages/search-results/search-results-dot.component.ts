import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-results-dot',
  template: `
    <div class="row justify-content-center align-items-center" style="height: 200px;">
      <div id="wave">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  `,
  styleUrls: ['search-results-dot.component.scss']
})
export class SearchResultsDotComponent implements OnInit {

  ngOnInit() {
  }

}
