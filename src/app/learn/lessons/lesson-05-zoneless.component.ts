import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson-05-zoneless',
  imports: [RouterLink],
  templateUrl: './lesson-05-zoneless.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson05ZonelessComponent {
  protected plainCount = 0;
  protected readonly signalCount = signal(0);

  protected readonly v16Snippet = `// Zone.js patched setTimeout, XHR, addEventListener
setTimeout(() => this.count++, 500);
// the view refreshed automatically`;

  protected readonly v20Snippet = `setTimeout(() => this.plainCount++, 500); // UI may stay stale
setTimeout(() => this.signalCount.update((n) => n + 1), 500); // UI updates`;

  protected bumpPlainNow(): void {
    this.plainCount += 1;
  }

  protected bumpPlainLater(): void {
    window.setTimeout(() => {
      this.plainCount += 1;
    }, 600);
  }

  protected bumpSignalLater(): void {
    window.setTimeout(() => {
      this.signalCount.update((count) => count + 1);
    }, 600);
  }
}
