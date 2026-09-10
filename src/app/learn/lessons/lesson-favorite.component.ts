import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-lesson-favorite',
  templateUrl: './lesson-favorite.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonFavoriteComponent {
  public readonly favorite = model(false);
}
