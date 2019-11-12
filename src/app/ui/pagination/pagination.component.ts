import {Component, EventEmitter, Input, Output, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent implements  OnChanges {
  public currentPage: number;
  public count: number;
  public showNextButton = true;;
  @Input() pagination: any;
  @Output() emitPagination = new EventEmitter<string>();

  ngOnChanges() {
    console.log('pagination', this.pagination);
    if(this.pagination.total_count === this.pagination.offset + this.pagination.count) {
      this.showNextButton = false;
    }
    if (this.pagination.offset === 0) {
      this.currentPage = 1;
    } else {
      if(this.pagination.offset % this.pagination.count === 0) {
        this.currentPage = this.pagination.offset / this.pagination.count + 1;
      }
    }
  }

  public startPagination(offset) {
    this.emitPagination.emit(offset);
  }

}
