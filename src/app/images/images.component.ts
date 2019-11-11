import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from './services/image.service';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ImageSearchService } from '../ui/image-search/image-search.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit, OnDestroy {
  public images;
  public showSpinner: boolean;
  private unsubscribe: Subject<any>;

  private subs: Subscription;

  constructor(private imageService: ImageService, private imageSearchService: ImageSearchService) {
    this.unsubscribe = new Subject();
  }

  // API key: krYLN9xmR99j1WQkm5nERGA0w3bXmD2D
  ngOnInit() {
    this.showSpinner = true;
    this.subs = this.imageSearchService.searchImages$.subscribe( images => {
      if(images && images.length > 0) {
        console.log('IMAGES SUBS IF!!', images);
        this.images = images;
        this.showSpinner = false;
      } else if(images && images.length === 0) {
        console.log('NO IMAGES FOUND!');
        this.images = null;
      } else {
        console.log('else - load default images.');
        this.loadImages();
      }
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Test method
  private loadImages() {
   
   const searchParams = '10&limit=25&offset=0&rating=G&lang=en';
    this.imageService.getImages(searchParams)
    .pipe(
      tap(response => {
        console.log('response', response);
        this.images = response.data;
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
      this.showSpinner = false;
      })
  ).subscribe();
  }

}
