import { Component, ChangeDetectorRef, OnInit, OnDestroy, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, tap, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-animated-like',
  templateUrl: './animated-like.component.html',
  styleUrls: ['./animated-like.component.scss'],
  animations: [
    trigger('heart', [
        state('unliked', style({
            color: '#fff',
            opacity: '0.5',
            transform: 'scale(1)'
        })),
        state('liked', style({
            color: '#e74c3c',
            opacity: '1',
            transform: 'scale(1.1)'
        })),
        transition('unliked <=> liked', animate('100ms ease-out'))
    ])
  ]
})
export class AnimatedLikeComponent implements OnInit, OnDestroy, OnChanges {


  private unsubscribe = new Subject();
  private likeSubject = new Subject();
  public likeState: string = 'unliked';
  public iconName: string = 'heart';

  @Output()
  like: EventEmitter<boolean> = new EventEmitter();

  @Input()
  liked = false;

  constructor(
    // private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.likeSubject.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
      tap( () => {
        if(this.likeState == 'unliked'){
          this.like.emit(false);
        } else {
          this.like.emit(true);
        }
      })
    ).subscribe();

    this.ngOnChanges();
  }

  ngOnDestroy() {
    
    this.unsubscribe.next(true);
    // this.unsubscribe.unsubscribe();
    this.unsubscribe.complete();
  }

  ngOnChanges() {
    if (this.liked) {
      this.likeState = 'liked';
    } else {
      this.likeState = 'unliked';
    }
    this.toggleLikeState();
  }

  toggleLikeState(){
    if(this.likeState == 'unliked'){
      this.likeState = 'liked';
      this.iconName = 'heart';
    } else {
      this.likeState = 'unliked';
      this.iconName = 'heart';
    }
    this.likeSubject.next();
  }
}
