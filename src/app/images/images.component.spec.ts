import { ComponentFixture, DeferBlockBehavior, TestBed } from '@angular/core/testing';
import { NEVER, of, throwError } from 'rxjs';
import { createImageSearchResult, createPagination } from '../../testing/giphy.fixtures';
import { createStableFixture, stabilize } from '../../testing/test-utils';
import { ImageService } from './services/image.service';
import { ImagesComponent } from './images.component';

describe('ImagesComponent', () => {
  let fixture: ComponentFixture<ImagesComponent>;
  let getImages: jest.Mock;

  beforeEach(async () => {
    getImages = jest.fn();

    await TestBed.configureTestingModule({
      imports: [ImagesComponent],
      deferBlockBehavior: DeferBlockBehavior.Playthrough,
      providers: [{ provide: ImageService, useValue: { getImages } }],
    }).compileComponents();

    fixture = await createStableFixture(ImagesComponent);
  });

  it('shows the welcome message before a search', () => {
    expect(fixture.nativeElement.querySelector('[data-cy="welcome-message"]')).toBeTruthy();
    expect(getImages).not.toHaveBeenCalled();
  });

  it('shows a spinner while results are loading', async () => {
    getImages.mockReturnValue(NEVER);

    fixture.componentInstance.onSearch('cats');
    await stabilize(fixture);

    expect(fixture.nativeElement.querySelector('[data-cy="spinner"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-cy="welcome-message"]')).toBeNull();
  });

  it('renders images and pagination after a successful search', async () => {
    const result = createImageSearchResult();
    getImages.mockReturnValue(of(result));

    fixture.componentInstance.onSearch('cats');
    await stabilize(fixture);

    const images = fixture.nativeElement.querySelectorAll('[data-cy="gif-image"]');
    expect(images).toHaveLength(result.images.length);
    expect(getImages).toHaveBeenCalledWith('cats', 0);
    expect(fixture.nativeElement.querySelector('[data-cy="pagination"]')).toBeTruthy();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('shows the empty state when the API returns no images', async () => {
    getImages.mockReturnValue(
      of(
        createImageSearchResult({
          images: [],
          pagination: createPagination({ count: 0, total_count: 0 }),
        })
      )
    );

    fixture.componentInstance.onSearch('unknown');
    await stabilize(fixture);

    expect(fixture.nativeElement.querySelector('[data-cy="not-found"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-cy="pagination"]')).toBeNull();
  });

  it('shows an error message when the request fails', async () => {
    getImages.mockReturnValue(throwError(() => new Error('network')));

    fixture.componentInstance.onSearch('cats');
    await stabilize(fixture);

    const error = fixture.nativeElement.querySelector('[data-cy="error-message"]') as HTMLElement;
    expect(error.textContent).toContain('Unable to load images. Please try again.');
  });

  it('requests the next page with the emitted offset', async () => {
    getImages.mockReturnValue(of(createImageSearchResult()));

    fixture.componentInstance.onSearch('cats');
    await stabilize(fixture);

    getImages.mockReturnValue(
      of(
        createImageSearchResult({
          pagination: createPagination({ offset: 25 }),
        })
      )
    );

    fixture.componentInstance.onPageOffsetChange(25);
    await stabilize(fixture);

    expect(getImages).toHaveBeenLastCalledWith('cats', 25);
  });
});
