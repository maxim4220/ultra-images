import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from './services/image.service';
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {ImageSearchService} from '../ui/image-search/image-search.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit, OnDestroy {
  public images;
  public showSpinner: boolean;
  public pagination;

  private unsubscribe: Subject<any>;
  private subs: Subscription;
  private searchInput;

  constructor(private imageService: ImageService, private imageSearchService: ImageSearchService,
              private activatedRoute: ActivatedRoute) {
    this.unsubscribe = new Subject();
  }

  ngOnInit() {
   // this.showSpinner = true;
    // this.subs = this.imageSearchService.searchImages$.subscribe(response => {
    //   if (response && response.data.length > 0) {
    //     this.images = response.data;
    //     this.pagination = response.pagination;
    //     this.showSpinner = false;
    //   } else if (response && response.data.length === 0) {
    //     this.pagination = null;
    //     this.images = null;
    //     this.showSpinner = false;
    //   } else {
    //     this.loadImages();
    //   }
    // });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public getPagination(event) {
    // const searchQuery = this.activatedRoute.snapshot.paramMap.get('searchQuery');
    // const offset = '&offset=' + event;
    // if (searchQuery) {
    //   const q = '&q=' + searchQuery;
    //   this.loadImages(q, offset);
    // } else {
    //   this.loadImages(null, offset);
    // }
  }

  public getSearchOutput( event) {
    console.log('output ev', event);
    this.searchInput = event;
    this.loadImages(event);
  }

  private loadImages(searchInput) {
    this.showSpinner = true;
    // let searchParams = '';
    // if (offset) {
    //   searchParams += offset;
    // }
    // if (q) {
    //   searchParams += q;
    // } else {
    //   searchParams += '&q=backbone';
    // }
    const searchParams = '&q=' + searchInput;
    this.imageService.getImages(searchParams)
      .pipe(
        tap(response => {
          this.images = response.data;
          this.pagination = response.pagination;
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.showSpinner = false;
        })
      ).subscribe();
  } 

}
