import { Component, OnDestroy } from '@angular/core';
import { ImageService } from './services/image.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass'],
})
export class ImagesComponent implements OnDestroy {
  public images = [];
  public pagination: {};
  public showSpinner = false;
  public showMessage = true;

  private unsubscribe: Subject<any> = new Subject();
  private searchInput: string;

  constructor(private imageService: ImageService) {}

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public getPagination(event): void {
    const offset = '&offset=' + event;
    this.loadImages(offset);
  }

  public getSearchOutput(event): void {
    this.showMessage = false;
    this.searchInput = event;
    this.loadImages();
  }

  private loadImages(offset?): void {
    this.showSpinner = true;
    let searchParams = '&q=' + this.searchInput;
    if (offset) {
      searchParams += offset;
    }
    this.imageService
      .getImages(searchParams)
      .pipe(
        map(response => {
          const images = [];
          response.data.forEach(element => {
            images.push(element.images.fixed_width_downsampled.url);
          });
          return {
            images,
            pagination: response.pagination,
          };
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe(result => {
        if (result.images.length > 0) {
          this.images = result.images;
          this.pagination = result.pagination;
        } else {
          this.images = null;
          this.pagination = null;
        }
        this.showSpinner = false;
      });
  }
}
