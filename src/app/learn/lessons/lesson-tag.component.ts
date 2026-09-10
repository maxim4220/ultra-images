import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-lesson-tag',
  templateUrl: './lesson-tag.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonTagComponent {
  public readonly label = input.required<string>();
  public readonly removed = output<string>();

  protected remove(): void {
    this.removed.emit(this.label());
  }
}
