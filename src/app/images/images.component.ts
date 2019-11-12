import {Component, OnDestroy, } from '@angular/core';
import {ImageService} from './services/image.service';
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {Subject, } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})

export class ImagesComponent implements OnDestroy {
  public images: any;
  public pagination = {};
  public showSpinner = false;
  public showMessage = true;

  private unsubscribe: Subject<any> = new Subject();
  private searchInput: string;

  constructor(private imageService: ImageService) {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public getPagination(event) {
    console.log('event', event);
    const offset = '&offset=' + event;
    this.loadImages(offset);
  }

  public getSearchOutput(event) {
    this.showMessage = false;
    console.log('output ev', event);
    this.searchInput = event;
    this.loadImages();
  }

  private loadImages(offset?) {
    this.showSpinner = true;
    let searchParams = '&q=' + this.searchInput;
    if (offset) {
      searchParams += offset;
    }
    this.imageService.getImages(searchParams)
      .pipe(
        tap(response => {
          if (response.data.length > 0 ) {
            this.images = response.data;
            this.pagination = response.pagination;
          } else {
            this.images = null;
            this.pagination = null;
          }
          this.pagination = response.pagination;
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.showSpinner = false;
        })
      ).subscribe();
  }

}
