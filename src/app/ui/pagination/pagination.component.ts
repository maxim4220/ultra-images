import {Component, EventEmitter, Input, Output, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent implements OnInit, OnChanges {
  public currentPage;
  public count: number;
  @Input() pagination: any;
  @Output() emitPagination = new EventEmitter<string>();

  ngOnInit() {
    this.count = this.pagination.count;
    console.log('111', this.count);
  }

  ngOnChanges() {
    console.log('pagination', this.pagination);
    if (this.pagination.offset === 0) {
      this.currentPage = 1;
    } else {
      this.currentPage = Math.floor(this.pagination.offset / this.pagination.count) + 1;
      console.log('this.currentPage', this.currentPage );
    }
  }

  public startPagination(offset) {
    this.emitPagination.emit(offset);
  }

}
