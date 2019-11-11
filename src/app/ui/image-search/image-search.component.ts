import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ImageService} from 'src/app/images/services/image.service';
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {ImageSearchService} from './image-search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.sass']
})

export class ImageSearchComponent implements OnInit {
  public images$: BehaviorSubject<[]>;
  // private unsubscribe: Subject<any>;

  @Output() emitSearch = new EventEmitter<string>();

  constructor() {
  //  this.unsubscribe = new Subject();
  //  this.images$ = new BehaviorSubject(null);
  }

  ngOnInit() {
  }

  public performSearch(searchTerm: HTMLInputElement, event?) {
    // To do: add spinner
    if (event) {
      event.preventDefault();
    }
    if (searchTerm.value) {
      this.emitSearch.emit(searchTerm.value);

      // this.imageService.getImages('&q=' + searchTerm.value).pipe(
      //   tap(response => {
      //     this.imageSearchService.shareImageSearch(response);
      //   }),
      //   takeUntil(this.unsubscribe),
      //   finalize(() => {
      //     // To do: Turn off spinner
      //     return this.router.navigate(['images/' + searchTerm.value]);
      //   })
      // ).subscribe();

    }
  }

}
