import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImageSearchService {
  public searchImages$: BehaviorSubject<any>;

  constructor() {
    this.searchImages$ = new BehaviorSubject(null);
  }

  public shareImageSearch(images) {
    return this.searchImages$.next(images);
  }


}
