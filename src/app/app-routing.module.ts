import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ImagesModule } from './images/images.module';
import { ImagesComponent } from './images/images.component';


const routes: Routes = [
  {
    path: 'images',
    component: ImagesComponent
  },
  {
    path: '**',
    redirectTo: 'images',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
