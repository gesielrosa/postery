import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/posters/pages/routes').then(m => m.ROUTES),
  },
  {
    path: 'errors',
    loadChildren: () => import('./core/errors/pages/routes').then(m => m.ROUTES),
  },
  {
    path: '**',
    redirectTo: 'errors/404',
  },
];
