import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListComponent {
  public readonly images = input.required<readonly string[]>();
}
