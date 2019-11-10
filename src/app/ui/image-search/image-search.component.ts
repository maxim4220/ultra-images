import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/images/services/image.service';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { ImageSearchService } from './image-search.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.sass']
})

export class ImageSearchComponent implements OnInit {
  private unsubscribe: Subject<any>;
  public images$: BehaviorSubject<[]>;

  constructor(private imageService: ImageService, private imageSearchService: ImageSearchService) {
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
      this.imageService.getImages(searchTerm.value).pipe(
        tap(response => {
         this.imageSearchService.shareImageSearch(response.data);
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
        // To do: Turn off spinner
        })
    ).subscribe();

    }
  }

}
