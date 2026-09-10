import { Routes } from '@angular/router';

export const learnRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./learn-home.component').then((m) => m.LearnHomeComponent),
  },
  {
    path: '1',
    loadComponent: () =>
      import('./lessons/lesson-01-control-flow.component').then((m) => m.Lesson01ControlFlowComponent),
  },
  {
    path: '2',
    loadComponent: () => import('./lessons/lesson-02-signals.component').then((m) => m.Lesson02SignalsComponent),
  },
  {
    path: '3',
    loadComponent: () =>
      import('./lessons/lesson-03-component-io.component').then((m) => m.Lesson03ComponentIoComponent),
  },
  {
    path: '4',
    loadComponent: () =>
      import('./lessons/lesson-04-rxjs-interop.component').then((m) => m.Lesson04RxjsInteropComponent),
  },
  {
    path: '5',
    loadComponent: () => import('./lessons/lesson-05-zoneless.component').then((m) => m.Lesson05ZonelessComponent),
  },
];
