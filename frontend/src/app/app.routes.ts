import { Routes } from '@angular/router';

import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },

  {
    path: 'collection',
    component: Dashboard,
  },

  {
    path: 'databank',
    component: Dashboard,
  },

  {
    path: 'wishlist',
    component: Dashboard,
  },

  {
    path: 'identify',
    component: Dashboard,
  },

  {
    path: 'scan',
    component: Dashboard,
  },

  {
    path: 'profile',
    component: Dashboard,
  },

  {
    path: '**',
    redirectTo: '',
  },
];