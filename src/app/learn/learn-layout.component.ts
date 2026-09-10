import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LESSONS } from './lessons.const';

@Component({
  selector: 'app-learn-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './learn-layout.component.html',
  styleUrl: './learn-layout.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnLayoutComponent {
  protected readonly lessons = LESSONS;
}
