import { TestBed } from '@angular/core/testing';
import { createStableFixture } from '../../../testing/test-utils';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();
  });

  it('renders an accessible loading indicator', async () => {
    const fixture = await createStableFixture(SpinnerComponent);
    const spinner = fixture.nativeElement.querySelector('[data-cy="spinner"]') as HTMLElement;

    expect(spinner).toBeTruthy();
    expect(spinner.getAttribute('role')).toBe('status');
    expect(spinner.getAttribute('aria-label')).toBe('Loading');
  });
});
