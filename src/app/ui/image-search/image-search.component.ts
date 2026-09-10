import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';

interface SearchFormModel {
  query: string;
}

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrl: './image-search.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSearchComponent {
  public readonly searchSubmitted = output<string>();

  protected readonly searchModel = signal<SearchFormModel>({
    query: '',
  });

  protected readonly query = computed(() => this.searchModel().query);
  protected readonly canSubmit = computed(() => this.query().trim().length > 0);

  protected onQueryInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    console.log('onQueryInput', query);
    this.searchModel.set({ query });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    const query = this.query().trim();
    if (!query) {
      return;
    }

    this.searchSubmitted.emit(query);
  }
}
