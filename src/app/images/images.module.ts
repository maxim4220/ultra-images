import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { Routes, RouterModule } from '@angular/router';

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
  }
];

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})

export class ImagesModule { 
}
