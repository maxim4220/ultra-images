import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageSearchComponent} from './image-search/image-search.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {PaginationComponent} from './pagination/pagination.component';
import { ImageListComponent } from './image-list/image-list.component';

@NgModule({
  declarations: [ImageSearchComponent, SpinnerComponent, PaginationComponent, ImageListComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageSearchComponent, SpinnerComponent, PaginationComponent, ImageListComponent
  ]
})

export class UiModule {
}
