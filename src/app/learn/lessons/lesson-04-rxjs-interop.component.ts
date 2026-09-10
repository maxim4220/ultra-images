import { ChangeDetectionStrategy, Component, computed, inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { delay, map, of, switchMap } from 'rxjs';

@Injectable()
class LessonSearchService {
  public lookup(query: string) {
    const catalog = ['cats', 'catjam', 'cat typing', 'dogs', 'dog dance'];
    return of(query).pipe(
      delay(400),
      map((value) => catalog.filter((item) => item.includes(value.toLowerCase())))
    );
  }
}

@Component({
  selector: 'app-lesson-04-rxjs-interop',
  imports: [RouterLink],
  providers: [LessonSearchService],
  templateUrl: './lesson-04-rxjs-interop.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson04RxjsInteropComponent {
  private readonly searchService = inject(LessonSearchService);

  protected readonly query = signal('cat');
  private readonly query$ = toObservable(this.query);
  private readonly results$ = this.query$.pipe(switchMap((query) => this.searchService.lookup(query)));
  protected readonly results = toSignal(this.results$, { initialValue: [] as string[] });
  protected readonly resultCount = computed(() => this.results().length);

  protected readonly v16Snippet = `this.query$.pipe(
  switchMap((q) => this.api.search(q))
).subscribe((rows) => this.results = rows);
// or | async in the template`;

  protected readonly v20Snippet = `query = signal('cat');
results = toSignal(
  toObservable(this.query).pipe(switchMap((q) => this.api.lookup(q))),
  { initialValue: [] }
);`;

  protected setQuery(value: string): void {
    this.query.set(value);
  }
}
