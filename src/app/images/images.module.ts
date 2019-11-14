import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { UiModule } from '../ui/ui.module';
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [ImagesComponent],
  imports: [CommonModule, UiModule],
  providers: [ImageService],
})
export class ImagesModule {}
