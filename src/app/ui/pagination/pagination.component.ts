import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})

export class PaginationComponent {
  public lastPage: number;
  public currentPage: number;
  
  @Input() pagination: any;
  @Output() emitPagination = new EventEmitter<string>();

  public startPagination(offset) {
   this.emitPagination.emit(offset);
  }

}
