import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { GIPHY_PAGE_SIZE } from '../../api-config';
import { Pagination } from '../../images/models/giphy.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  public readonly pagination = input.required<Pagination>();
  public readonly pageSize = input(GIPHY_PAGE_SIZE);
  public readonly pageOffsetChange = output<number>();

  protected readonly currentPage = computed(() => {
    const { offset, count } = this.pagination();
    const pageSize = count || this.pageSize();
    return Math.floor(offset / pageSize) + 1;
  });

  protected readonly hasPrevious = computed(() => this.pagination().offset > 0);
  protected readonly hasNext = computed(() => {
    const { offset, count, total_count } = this.pagination();
    return offset + count < total_count;
  });

  protected goToPrevious(): void {
    if (!this.hasPrevious()) {
      return;
    }

    this.pageOffsetChange.emit(Math.max(0, this.pagination().offset - this.pageSize()));
  }

  protected goToNext(): void {
    if (!this.hasNext()) {
      return;
    }

    this.pageOffsetChange.emit(this.pagination().offset + this.pageSize());
  }
}
