import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonFavoriteComponent } from './lesson-favorite.component';
import { LessonTagComponent } from './lesson-tag.component';

@Component({
  selector: 'app-lesson-03-component-io',
  imports: [RouterLink, LessonTagComponent, LessonFavoriteComponent],
  templateUrl: './lesson-03-component-io.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson03ComponentIoComponent {
  protected readonly tags = signal(['zoneless', 'signals']);
  protected readonly favorite = signal(false);

  protected readonly v16Snippet = `@Input({ required: true }) label!: string;
@Output() removed = new EventEmitter<string>();
@Input() favorite = false;
@Output() favoriteChange = new EventEmitter<boolean>();`;

  protected readonly v20Snippet = `label = input.required<string>();
removed = output<string>();
favorite = model(false); // two-way, replaces banana-box pair`;

  protected removeTag(label: string): void {
    this.tags.update((tags) => tags.filter((tag) => tag !== label));
  }
}
