import { Component, OnInit } from '@angular/core';
import { ImageService } from './services/image.service';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit {

  private unsubscribe: Subject<any>;

  constructor(private imageService: ImageService) { 
    this.unsubscribe = new Subject();
  }

  // API key: krYLN9xmR99j1WQkm5nERGA0w3bXmD2D
  ngOnInit() {
    
    
  }
  // Test method
  private loadImages() {
    const url = '';
    this.imageService.getImages(url).pipe(
      tap(response => {
          if (response.status_code === '200') {
          }
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        
      })
  ).subscribe();
  }

}
