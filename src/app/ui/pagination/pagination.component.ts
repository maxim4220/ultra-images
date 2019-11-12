import {Component, EventEmitter, Input, Output, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent implements OnInit, OnChanges {
  public currentPage: number;
  public countStep: number;
  public showNextButton = true;

  @Input() pagination: any;
  @Output() emitPagination = new EventEmitter<string>();

  ngOnInit() {
    this.countStep = this.pagination.count;
  }

  ngOnChanges() {
    this.showNextButton = true;
    if (this.pagination.total_count === this.pagination.offset + this.pagination.count) {
      this.showNextButton = false;
    }
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
    this.emitPagination.emit(offset);
  }

}
