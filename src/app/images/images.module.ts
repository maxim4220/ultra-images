import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagesComponent} from './images.component';
import {RouterModule, Routes} from '@angular/router';
import {UiModule} from '../ui/ui.module';
import { ImageService } from './services/image.service';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'images',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: ':searchQuery',
    component: ImagesComponent,
  }
];

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule
  ],
  providers: [
    ImageService,
   ],
})

export class ImagesModule {
}
