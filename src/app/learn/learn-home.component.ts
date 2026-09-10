import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LESSONS } from './lessons.const';

@Component({
  selector: 'app-learn-home',
  imports: [RouterLink],
  templateUrl: './learn-home.component.html',
  styleUrl: './learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnHomeComponent {
  protected readonly lessons = LESSONS;
}
