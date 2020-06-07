import {AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, map, take} from 'rxjs/operators';
import {statesWithFlagsMocks} from '@data/states';
import {DeviceDetectorService} from "ngx-device-detector";

const statesWithFlags: { name: string, flag: string }[] = statesWithFlagsMocks;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearcherComponent implements OnInit, AfterViewInit {
  public model: any;
  public searchSuggestionMinWidth = 0;
  @ViewChild('searchInput', {static: false}) searchInput;
  @ViewChild('searchForm', {static: false}) searchForm;

  constructor(
      private deviceService: DeviceDetectorService
  ) {

  }

  search = (text$: Observable<string>) =>
      text$.pipe(
          debounceTime(200),
          map(term => {
            return term === '' ? []
                : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
          }, take(5)),
      );

  formatter = (x: { name: string }) => x.name;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.resizeSearchSuggestions();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.resizeSearchSuggestions();
  }

  resizeSearchSuggestions(): void {
    const element = this.searchForm.nativeElement;
    const searchSuggestionMinWidth = element.clientWidth;
    this.searchSuggestionMinWidth = searchSuggestionMinWidth;
  }
}
