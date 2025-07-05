import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '404',
    loadComponent: () => import('./not-found').then(m => m.NotFoundComponent),
  },
];
