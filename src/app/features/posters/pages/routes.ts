import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./list').then(m => m.ListComponent),
  },
  {
    path: 'posters/add',
    loadComponent: () => import('./form').then(m => m.FormComponent),
  },
  {
    path: 'posters/details/:id',
    loadComponent: () => import('./details').then(m => m.DetailsComponent),
  },
  {
    path: 'posters/edit/:id',
    loadComponent: () => import('./form').then(m => m.FormComponent),
  },
];
