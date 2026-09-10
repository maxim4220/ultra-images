import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { ImageListComponent } from '../ui/image-list/image-list.component';
import { ImageSearchComponent } from '../ui/image-search/image-search.component';
import { PaginationComponent } from '../ui/pagination/pagination.component';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { Pagination } from './models/giphy.model';
import { ImageService } from './services/image.service';

interface SearchParams {
  readonly query: string;
  readonly offset: number;
}

type ImagesLoadState =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | {
      readonly status: 'success';
      readonly images: readonly string[];
      readonly pagination: Pagination | null;
    }
  | { readonly status: 'error'; readonly message: string };

@Component({
  selector: 'app-images',
  imports: [ImageSearchComponent, ImageListComponent, PaginationComponent, SpinnerComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesComponent {
  private readonly imageService = inject(ImageService);

  private readonly query = signal('');
  private readonly offset = signal(0);

  private readonly searchParams = computed<SearchParams>(() => ({
    query: this.query(),
    offset: this.offset(),
  }));

  private readonly images$ = toObservable(this.searchParams).pipe(
    switchMap(({ query, offset }) => {
      if (query.length === 0) {
        return of<ImagesLoadState>({ status: 'idle' });
      }

      return this.imageService.getImages(query, offset).pipe(
        map(
          (result): ImagesLoadState => ({
            status: 'success',
            images: result.images,
            pagination: result.images.length > 0 ? result.pagination : null,
          })
        ),
        catchError(() =>
          of<ImagesLoadState>({
            status: 'error',
            message: 'Unable to load images. Please try again.',
          })
        ),
        startWith<ImagesLoadState>({ status: 'loading' })
      );
    })
  );

  protected readonly loadState = toSignal(this.images$, {
    initialValue: { status: 'idle' } satisfies ImagesLoadState,
  });

  protected readonly isLoading = computed(() => this.loadState().status === 'loading');
  protected readonly showWelcome = computed(() => this.loadState().status === 'idle');
  protected readonly showResults = computed(() => this.loadState().status === 'success');
  protected readonly errorMessage = computed(() => {
    const state = this.loadState();
    return state.status === 'error' ? state.message : null;
  });
  protected readonly images = computed(() => {
    const state = this.loadState();
    return state.status === 'success' ? state.images : [];
  });
  protected readonly pagination = computed(() => {
    const state = this.loadState();
    return state.status === 'success' ? state.pagination : null;
  });

  constructor() {
    effect(() => {
      const state = this.loadState();
      if (state.status !== 'success') {
        return;
      }

      untracked(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  public onSearch(query: string): void {
    this.offset.set(0);
    this.query.set(query);
  }

  public onPageOffsetChange(offset: number): void {
    this.offset.set(offset);
  }
}
