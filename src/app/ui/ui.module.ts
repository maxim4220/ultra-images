import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSearchComponent } from './image-search/image-search.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [ImageSearchComponent, SpinnerComponent, PaginationComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageSearchComponent, SpinnerComponent, PaginationComponent
  ]
})

export class UiModule {
}
