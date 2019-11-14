import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.sass']
})

export class ImageSearchComponent {
  @Output() emitSearch = new EventEmitter<string>();
  public search: FormControl = new FormControl('');

  public performSearch(): void {
    this.emitSearch.emit(this.search.value);
  }

}
