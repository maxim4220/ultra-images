import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GIPHY_PAGE_SIZE } from '../../api-config';
import { createPagination } from '../../../testing/giphy.fixtures';
import { stabilize } from '../../../testing/test-utils';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let emittedOffsets: number[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    emittedOffsets = [];
    fixture.componentInstance.pageOffsetChange.subscribe((offset) => emittedOffsets.push(offset));
  });

  it('does not render controls when count is zero', async () => {
    fixture.componentRef.setInput('pagination', createPagination({ count: 0 }));
    await stabilize(fixture);

    expect(fixture.nativeElement.querySelector('[data-cy="pagination"]')).toBeNull();
  });

  it('disables Previous on the first page and emits the next offset', async () => {
    fixture.componentRef.setInput('pagination', createPagination({ offset: 0, count: 25, total_count: 100 }));
    await stabilize(fixture);

    const previous = queryButton(fixture, 'pagination-previous');
    const next = queryButton(fixture, 'pagination-next');
    const current = fixture.nativeElement.querySelector('[data-cy="pagination-current"]') as HTMLButtonElement;

    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);
    expect(current.textContent?.trim()).toBe('1');

    next.click();
    await stabilize(fixture);

    expect(emittedOffsets).toEqual([GIPHY_PAGE_SIZE]);
  });

  it('disables Next on the last page and emits the previous offset', async () => {
    fixture.componentRef.setInput(
      'pagination',
      createPagination({ offset: 75, count: 25, total_count: 100 })
    );
    await stabilize(fixture);

    const previous = queryButton(fixture, 'pagination-previous');
    const next = queryButton(fixture, 'pagination-next');
    const current = fixture.nativeElement.querySelector('[data-cy="pagination-current"]') as HTMLButtonElement;

    expect(previous.disabled).toBe(false);
    expect(next.disabled).toBe(true);
    expect(current.textContent?.trim()).toBe('4');

    previous.click();
    await stabilize(fixture);

    expect(emittedOffsets).toEqual([50]);
  });
});

function queryButton(fixture: ComponentFixture<PaginationComponent>, selector: string): HTMLButtonElement {
  return fixture.nativeElement.querySelector(`[data-cy="${selector}"]`) as HTMLButtonElement;
}
