import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, map, take} from 'rxjs/operators';
import {statesWithFlagsMocks} from '@data/states';

const statesWithFlags: {name: string, flag: string}[] = statesWithFlagsMocks;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearcherComponent implements OnInit {
  public model: any;

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => {
      return  term === '' ? []
      : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
    }, take(5)),
  )

formatter = (x: {name: string}) => x.name;

  constructor() {

  }

  ngOnInit() {}
}
