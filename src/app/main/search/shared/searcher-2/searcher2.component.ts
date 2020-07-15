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
import {combineLatest, Observable, of, Subject, timer} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
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
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchSuggestion} from '@app/main/search/models/SearchSuggestion';

const statesWithFlags: { name: string, flag: string }[] = statesWithFlagsMocks;

@Component({
  selector: 'app-searcher2',
  templateUrl: './searcher2.component.html',
  styleUrls: ['./searcher2.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class Searcher2Component implements OnInit, AfterViewInit, OnDestroy {
  public searchModel: any = '';
  searching = false;
  searching$ = this.mediasSearchApiService.query.selectLoading();
  searchFailed = false;
  paramActiveSearchTab: string;
  public searchSuggestionMinWidth = 0;
  myControl = new FormControl();
  @ViewChild('searchInputRef', {static: false}) searchInputRef;
  @ViewChild('searchFormRef', {static: false}) searchFormRef;
  searchQuery$ = new Subject<string>();
  searchText = '';
  results$: Observable<SearchSuggestion[]>;
  public searchForm: FormGroup;
  private unsubscribe = new Subject();

  constructor(
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute,
    private router: Router,
    private mediasSearchApiService: MediasSearchApiService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    @Inject(WINDOW) private window: Window
  ) {
    // this.control.valueChanges.subscribe((completed: boolean) => {
    //   this.complete.emit({ ...this.todo, completed });
    // });
  }

  get searchInput() {
    return this.searchForm && this.searchForm.get('search');
  }

  // states$ = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     tap(resp => this.mediasSearchApiService.store.setLoading(true)),
  //     switchMap(term => {
  //       return this.mediasSearchApiService.searchImages({states: [term]}).pipe(
  //         tap(resp => this.mediasSearchApiService.store.setLoading(false)),
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

  // // @HostListener('window:resize', ['$event'])
  // onWindowResize(event: Event) {
  //   this.resizeSearchSuggestions();
  // }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, Validators.nullValidator),
    });

    this.handleSearchQueryOnInputValueChanges();
    this.handleSearchQueryFromUrl();

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


  handleSearchQueryFromUrl() {

    if (this.route.firstChild) {

      combineLatest(
        this.route.firstChild.queryParams,
        this.route.firstChild.params
      )
        .pipe(takeUntil(this.unsubscribe)).subscribe(
        ([queryParams, params]: any) => {
          if (queryParams.hasOwnProperty('q')) {
            const text = queryParams.q || '';
            this.searchInput.setValue(text);
          }
          if (params.hasOwnProperty('active_search_tab')) {
            this.paramActiveSearchTab = params.active_search_tab;
          }
          // console.log({queryParams, params});
        });
    }
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
      console.log('submit', searchText);
      this.searchText = searchText;
      this.mediasSearchApiService.query.pushNewSuggestion(searchText);
      this.searchInput.setValue(searchText);
    }
    this.searchNavigate(null);
  }

  searchNavigate(nextTab: string) {
    if (this.searchText.length === 0) {
      return;
    }
    this.paramActiveSearchTab = nextTab;
    this.router.navigate([nextTab || 'images'], {
      relativeTo: this.route,
      queryParams: {
        // q: this.searchModel
        q: this.searchText
      }
    });
  }

}
