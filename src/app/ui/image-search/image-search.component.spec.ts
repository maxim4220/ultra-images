import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createStableFixture, stabilize } from '../../../testing/test-utils';
import { ImageSearchComponent } from './image-search.component';

describe('ImageSearchComponent', () => {
  let fixture: ComponentFixture<ImageSearchComponent>;
  let emittedQueries: string[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSearchComponent],
    }).compileComponents();

    fixture = await createStableFixture(ImageSearchComponent);
    emittedQueries = [];
    fixture.componentInstance.searchSubmitted.subscribe((query) => emittedQueries.push(query));
  });

  it('disables search until the query has a non-whitespace value', async () => {
    const button = querySubmitButton(fixture);

    expect(button.disabled).toBe(true);

    typeQuery(fixture, '   ');
    await stabilize(fixture);

    expect(querySubmitButton(fixture).disabled).toBe(true);
  });

  it('enables search and emits a trimmed query on submit', async () => {
    typeQuery(fixture, '  cats  ');
    await stabilize(fixture);

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await stabilize(fixture);

    expect(querySubmitButton(fixture).disabled).toBe(false);
    expect(emittedQueries).toEqual(['cats']);
  });

  it('does not emit when the query is empty', async () => {
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await stabilize(fixture);

    expect(emittedQueries).toEqual([]);
  });
});

function querySubmitButton(fixture: ComponentFixture<ImageSearchComponent>): HTMLButtonElement {
  return fixture.nativeElement.querySelector('[data-cy="search-submit"]') as HTMLButtonElement;
}

function typeQuery(fixture: ComponentFixture<ImageSearchComponent>, value: string): void {
  const input = fixture.nativeElement.querySelector('[data-cy="search-input"]') as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
}
