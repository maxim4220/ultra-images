import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.sass']
})
export class ImageListComponent implements OnInit {
  @Input() images;
  constructor() { }

  ngOnInit() {
    console.log('images!!!', this.images);
    
  }

}
