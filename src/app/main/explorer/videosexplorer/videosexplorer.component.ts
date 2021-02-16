import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { dummyPicturesMocks } from '@data/dummy-pictures';
import {NgxMasonryOptions} from 'ngx-masonry';
import {FormBuilder, FormGroup} from '@angular/forms';
import {tap, distinctUntilChanged, debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {generateDummyPicturesMocks} from 'src/@data/dummy-pictures';
import {ImagesService} from '@app/main/@core/services/images.service';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';
import {Router} from '@angular/router';
import {Image} from '@app/main/@core/state/image/image.model';

@Component({
  selector: 'app-videos-explorer',
  templateUrl: './videosexplorer.component.html',
  styleUrls: [
    './videosexplorer.component.css',
    // '~/ng-masonry-grid/ng-masonry-grid.css',
  ],

  // encapsulation: ViewEncapsulation.None
})
export class VideosExplorerComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }


}
