import {Component, EventEmitter, Input, Output, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent implements OnChanges {
  public currentPage;
  @Input() pagination: any;
  @Output() emitPagination = new EventEmitter<string>();

 

  ngOnChanges() {
      console.log('pagination', this.pagination);
    this.currentPage = Math.floor(this.pagination.offset / this.pagination.count) + 1;
    console.log('this.currentPage', this.currentPage );
    
  }

  public startPagination(offset) {
    this.emitPagination.emit(offset);
  }

}
