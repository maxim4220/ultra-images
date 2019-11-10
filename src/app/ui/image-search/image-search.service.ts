import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ImageSearchService {
 public searchImages$: BehaviorSubject<[]>;
  constructor(private http: HttpClient) {
    this.searchImages$ = new BehaviorSubject(null);
   }

   public shareImageSearch(images) {
     return this.searchImages$.next(images);
   }


}
