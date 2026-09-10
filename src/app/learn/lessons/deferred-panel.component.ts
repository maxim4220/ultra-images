import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-deferred-panel',
  templateUrl: './deferred-panel.component.html',
  styleUrl: '../learn-lessons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferredPanelComponent {}
