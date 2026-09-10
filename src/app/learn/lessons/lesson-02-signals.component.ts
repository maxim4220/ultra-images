import { ChangeDetectionStrategy, Component, computed, effect, linkedSignal, signal, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson-02-signals',
  imports: [RouterLink],
  templateUrl: './lesson-02-signals.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson02SignalsComponent {
  protected readonly query = signal('cats');
  protected readonly page = linkedSignal({
    source: this.query,
    computation: () => 1,
  });
  protected readonly resultCount = computed(() => this.query().length * this.page());
  protected readonly log = signal('Effect has not run yet.');

  protected readonly v16Snippet = `query$ = new BehaviorSubject('cats');
page$ = new BehaviorSubject(1);
resultCount$ = combineLatest([query$, page$]).pipe(
  map(([q, page]) => q.length * page)
);
// remember to unsubscribe`;

  protected readonly v20Snippet = `query = signal('cats');
page = linkedSignal({ source: this.query, computation: () => 1 });
resultCount = computed(() => this.query().length * this.page());`;

  constructor() {
    effect(() => {
      const query = this.query();
      const page = this.page();
      untracked(() => {
        this.log.set(`Effect saw query="${query}" page=${page}`);
      });
    });
  }

  protected setQuery(value: string): void {
    this.query.set(value);
  }

  protected nextPage(): void {
    this.page.update((page) => page + 1);
  }
}
