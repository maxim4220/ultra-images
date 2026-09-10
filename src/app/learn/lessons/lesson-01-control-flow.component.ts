import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeferredPanelComponent } from './deferred-panel.component';

@Component({
  selector: 'app-lesson-01-control-flow',
  imports: [RouterLink, DeferredPanelComponent],
  templateUrl: './lesson-01-control-flow.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson01ControlFlowComponent {
  protected readonly showDetails = signal(false);
  protected readonly tags = signal(['standalone', 'signals', 'zoneless']);
  protected readonly mode = signal<'idle' | 'ready' | 'done'>('idle');

  protected readonly v16Snippet = `*ngIf="visible; else hidden"
*ngFor="let tag of tags; trackBy: trackByTag"
ngSwitch / *ngSwitchCase`;

  protected readonly v20Snippet = `@if (visible()) { ... } @else { ... }
@for (tag of tags(); track tag) { ... } @empty { ... }
@switch (mode()) { @case ('idle') { ... } }`;

  protected toggleDetails(): void {
    this.showDetails.update((value) => !value);
  }

  protected cycleMode(): void {
    const next = { idle: 'ready', ready: 'done', done: 'idle' } as const;
    this.mode.update((mode) => next[mode]);
  }
}
