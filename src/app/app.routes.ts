import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'images',
    loadComponent: () => import('./images/images.component').then((m) => m.ImagesComponent),
  },
  {
    path: 'learn',
    loadComponent: () => import('./learn/learn-layout.component').then((m) => m.LearnLayoutComponent),
    loadChildren: () => import('./learn/learn.routes').then((m) => m.learnRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'images',
  },
  {
    path: '**',
    redirectTo: 'images',
  },
];
