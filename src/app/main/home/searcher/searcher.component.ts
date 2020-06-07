import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, map, take, takeUntil} from 'rxjs/operators';
import {statesWithFlagsMocks} from '@data/states';
import {DeviceDetectorService} from 'ngx-device-detector';
import {WINDOW} from '@ng-toolkit/universal';

const statesWithFlags: { name: string, flag: string }[] = statesWithFlagsMocks;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearcherComponent implements OnInit, AfterViewInit, OnDestroy {
  public model: any;
  public searchSuggestionMinWidth = 0;
  @ViewChild('searchInput', {static: false}) searchInput;
  @ViewChild('searchForm', {static: false}) searchForm;
    private unsubscribe = new Subject();

  constructor(
      private deviceService: DeviceDetectorService,
      @Inject(WINDOW) private window: Window
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

    // @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.resizeSearchSuggestions();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
      fromEvent(this.window, 'resize')
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(this.onWindowResize.bind(this));
    this.resizeSearchSuggestions();
  }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

  resizeSearchSuggestions(): void {
    const element = this.searchForm.nativeElement;
    const searchSuggestionMinWidth = element.clientWidth;
    this.searchSuggestionMinWidth = searchSuggestionMinWidth;
      // console.log({searchSuggestionMinWidth});
  }


}
