import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Observable, of, Subject, timer} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import {statesWithFlagsMocks} from '@data/states';
import {DeviceDetectorService} from 'ngx-device-detector';
import {WINDOW} from '@ng-toolkit/universal';
import {MediasSearchApiService} from '@app/main/@core/services/medias-search-api.service';
import {SearchSuggestion} from '@app/main/search/models/SearchSuggestion';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
  myControl = new FormControl();
  @ViewChild('searchInputRef', {static: false}) searchInputRef;
  @ViewChild('searchFormRef', {static: false}) searchFormRef;
  private unsubscribe = new Subject();

  searchQuery$ = new Subject<string>();
  searchText = '';
  results$: Observable<SearchSuggestion[]>;

  public searchForm: FormGroup;

  constructor(
    private deviceService: DeviceDetectorService,
    private mediasSearchApiService: MediasSearchApiService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {
    //
  }

  get searchInput() {
    return this.searchForm && this.searchForm.get('search');
  }

  public searchCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        return term === '' ? []
          : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }, take(5)),
    )

  // public states$ = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     switchMap(term => {
  //       return this.mediasSearchApiService.searchSuggestions({states: term}).pipe(
  //         tap(() => this.searchFailed = false),
  //         take(5),
  //         // map((response) => response.map(X => X.description)),
  //         // tap(console.log),
  //         catchError(() => {
  //           this.searchFailed = true;
  //           return of([]);
  //         }));
  //     }),
  //     tap(() => this.searching = false)
  //   )

  // formatter = (x: { name: string }) => x.name;

  // @HostListener('window:resize', ['$event'])
  // onWindowResize(event: Event) {
  //   this.resizeSearchSuggestions();
  // }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, Validators.nullValidator),
    });

    this.handleSearchQueryOnInputValueChanges();

  }

  ngAfterViewInit(): void {
    // fromEvent(this.window, 'resize')
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe(this.onWindowResize.bind(this));
    this.resizeSearchSuggestions();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  handleSearchQueryOnInputValueChanges() {

    this.results$ = this.searchInput.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      filter($e => $e.length > 0 && this.searchText !== $e),
      tap($e => this.searchQuery$.next($e as string)),
      tap(($e) => this.searchText = $e),
      tap(() => this.searching = true),
      // tap($e => console.log({$e})),
      // takeUntil(this.unsubscribe),
      switchMap(term => {
        return this.mediasSearchApiService.searchSuggestions({search: term.toLowerCase()}).pipe(
          // tap(console.log),
          tap(() => this.searchFailed = false),
          take(5),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }));
      }),
      tap(() => this.searching = false)
    );
  }

  resizeSearchSuggestions(): void {

    timer(0, 500).pipe(takeUntil(this.unsubscribe), tap(_ => {
      const element = this.searchFormRef.nativeElement;
      const searchSuggestionMinWidth = element.clientWidth;
      this.searchSuggestionMinWidth = searchSuggestionMinWidth;
      // console.log({searchSuggestionMinWidth}, element.querySelector('.completer-dropdown'));
      if (element.querySelector('.completer-dropdown')) {
        this.renderer.setStyle(element.querySelector('.completer-dropdown'), 'width', `${searchSuggestionMinWidth}px`);
        // element.querySelector('.completer-dropdown').style.setProperty('width', `${searchSuggestionMinWidth}px !important`);
      }
    })).subscribe();
  }

  selected({text}) {
    this.searchText = text;
    // this.searchInputRef.nativeElement.value = $selected.states;
  }

  onDisplayValue($event) {
    return $event;
  }

  submit(searchText?: string) {
    if (searchText) {
      // console.log('submit', searchText);
      this.searchText = searchText;
      this.mediasSearchApiService.query.pushNewSuggestion(searchText);
      this.searchInput.setValue(searchText);
    }
    this.searchNavigate(null);
  }

  searchNavigate(nextTab: string) {
    const page = this.searchInput.value && this.searchInput.value.length ? '/search' : '/explorer';
    this.router.navigate([page, nextTab || 'images'], {
      queryParams: {
        q: this.searchText
      }
    });
  }
}
