import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './images/images.component';


const routes: Routes = [
  { path: 'images',
  loadChildren: () => import('./images/images.module').then(m => m.ImagesModule)
  },
  {path: '**',
   redirectTo: 'images', 
   pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
