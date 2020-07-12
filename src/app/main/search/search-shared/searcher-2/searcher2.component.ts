import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fromEvent, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {statesWithFlagsMocks} from '@data/states';
import {DeviceDetectorService} from 'ngx-device-detector';
import {WINDOW} from '@ng-toolkit/universal';
import {MediasSearchApiService} from '@app/main/@core/services/medias-search-api.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  searchFailed = false;
  paramActiveSearchTab: string;
  public searchSuggestionMinWidth = 0;
  @ViewChild('searchInput', {static: false}) searchInput;
  @ViewChild('searchForm', {static: false}) searchForm;
  private unsubscribe = new Subject();

  constructor(
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute,
    private router: Router,
    private mediasSearchApiService: MediasSearchApiService,
    @Inject(WINDOW) private window: Window
  ) {
    // this.control.valueChanges.subscribe((completed: boolean) => {
    //   this.complete.emit({ ...this.todo, completed });
    // });
  }

  searchCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        return term === '' ? []
          : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }, take(5)),
    )

  search$ = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      tap(resp => this.mediasSearchApiService.store.setLoading(true)),
      switchMap(term => {
        return this.mediasSearchApiService.searchImages({search: [term]}).pipe(
          tap(resp => this.mediasSearchApiService.store.setLoading(false)),
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
    )

  formatter = (x: { name: string }) => x.name;

  // @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.resizeSearchSuggestions();
  }

  ngOnInit(): void {

    if (this.route.firstChild) {

      this.route.firstChild.params
        .pipe(
          takeUntil(this.unsubscribe),
          // take(1)
        )
        .subscribe(
          (params: any) => {

            if (params.hasOwnProperty('active_search_tab')) {
              this.paramActiveSearchTab = params.active_search_tab;
            }

            //
            // this.image = this.imagesApiService.query.getActive() as Image;
            //
            //
            // if (!this.imagesApiService.query.hasActive() || this.imagesApiService.query.getActiveId() !== params.uid) {
            //   this.loading = true;
            //   this.imagesApiService.findOneById(params.uid)
            //     .pipe(
            //       takeUntil(this.unsubscribe),
            //       finalize(() => this.loading = false))
            //     .subscribe();
            //
            // }
            //
          });

      this.route.firstChild.queryParams
        // .pipe(take(1))
        .subscribe(
          (queryParams: any) => {
            if (queryParams.hasOwnProperty('q')) {
              this.searchModel = queryParams.q || '';
            }
          });

    }
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

  searchNavigate(nextTab: string) {
    this.paramActiveSearchTab = nextTab;
    this.router.navigate([nextTab], {
      relativeTo: this.route,
      queryParams: {
        q: this.searchModel
      }
    });
  }

}
