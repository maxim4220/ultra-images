import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';

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
  ]
})

export class ImagesModule { 
}
