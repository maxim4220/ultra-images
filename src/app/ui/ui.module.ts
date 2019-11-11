import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageSearchComponent} from './image-search/image-search.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {PaginationComponent} from './pagination/pagination.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ImageSearchComponent, SpinnerComponent, PaginationComponent, ImageListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ImageSearchComponent, SpinnerComponent, PaginationComponent, ImageListComponent
  ]
})

export class UiModule {
}
