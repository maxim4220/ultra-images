import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/images/services/image.service';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { ImageSearchService } from './image-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.sass']
})

export class ImageSearchComponent implements OnInit {
  private unsubscribe: Subject<any>;
  public images$: BehaviorSubject<[]>;

  constructor(private imageService: ImageService, private imageSearchService: ImageSearchService, private router: Router) {
    this.unsubscribe = new Subject();
    this.images$ = new BehaviorSubject(null);
   }

  ngOnInit() {
  }

  public performSearch(searchTerm: HTMLInputElement, event?) {
    // To do: add spinner
    if (event) {
      event.preventDefault();
    }
    if (searchTerm.value) {
      this.imageService.getImages('&q='+searchTerm.value).pipe(
        tap(response => {
         this.imageSearchService.shareImageSearch(response);
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
        // To do: Turn off spinner
        return this.router.navigate(['images/' + searchTerm.value]);
        })
    ).subscribe();

    }
  }

}
