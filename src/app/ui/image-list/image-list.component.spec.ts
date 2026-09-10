import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockImageUrls } from '../../../testing/giphy.fixtures';
import { stabilize } from '../../../testing/test-utils';
import { ImageListComponent } from './image-list.component';

describe('ImageListComponent', () => {
  let fixture: ComponentFixture<ImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageListComponent);
  });

  it('renders an image for each URL', async () => {
    fixture.componentRef.setInput('images', mockImageUrls);
    await stabilize(fixture);

    const images = fixture.nativeElement.querySelectorAll('[data-cy="gif-image"]') as NodeListOf<HTMLImageElement>;
    expect(images).toHaveLength(mockImageUrls.length);
    expect(Array.from(images).map((image) => image.src)).toEqual([...mockImageUrls]);
  });

  it('shows the not-found state when there are no images', async () => {
    fixture.componentRef.setInput('images', []);
    await stabilize(fixture);

    expect(fixture.nativeElement.querySelector('[data-cy="not-found"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-cy="image-list"]')).toBeNull();
  });
});
