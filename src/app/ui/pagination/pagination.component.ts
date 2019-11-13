import {Component, EventEmitter, Input, Output, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent implements OnChanges {
  public currentPage: number;
  public countStep: number = 25;
  public showNextButton = true;

  @Input() pagination: any;
  @Output() emitPagination = new EventEmitter<string>();

  ngOnChanges(): void {
    this.showNextButton = this.pagination.total_count !== this.pagination.offset + this.pagination.count;
    if (this.pagination.offset === 0) {
      this.currentPage = 1;
    } else {
      if (this.pagination.offset % this.pagination.count === 0) {
        this.currentPage = this.pagination.offset / this.pagination.count + 1;
      } else {
        this.pagination.count < this.countStep ? this.currentPage ++ : this.currentPage--;
      }
    }
  }

  public startPagination(offset) {
    return this.emitPagination.emit(offset);
  }

}
