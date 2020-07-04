import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fromEvent, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {statesWithFlagsMocks} from '@data/states';
import {DeviceDetectorService} from 'ngx-device-detector';
import {WINDOW} from '@ng-toolkit/universal';
import {MediasSearchApiService} from "@app/main/@core/services/medias-search-api.service";

const statesWithFlags: { name: string, flag: string }[] = statesWithFlagsMocks;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearcherComponent implements OnInit, AfterViewInit, OnDestroy {
  public model: any;
  searching = false;
  searchFailed = false;
  public searchSuggestionMinWidth = 0;
  @ViewChild('searchInput', {static: false}) searchInput;
  @ViewChild('searchForm', {static: false}) searchForm;
  private unsubscribe = new Subject();

  constructor(
    private deviceService: DeviceDetectorService,
    private mediasSearchApiService: MediasSearchApiService,
    @Inject(WINDOW) private window: Window
  ) {

  }

  searchCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        return term === '' ? []
          : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }, take(5)),
    );

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => {
        return this.mediasSearchApiService.searchImages([term]).pipe(
          tap(() => this.searchFailed = false),
          take(5),
          // map((response) => response.map(X => X.description)),
          // tap(console.log),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }));
      }),
      tap(() => this.searching = false)
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
    const element = this.searchInput.nativeElement;
    const searchSuggestionMinWidth = element.clientWidth;
    this.searchSuggestionMinWidth = searchSuggestionMinWidth;
    // console.log({searchSuggestionMinWidth});
  }


}
