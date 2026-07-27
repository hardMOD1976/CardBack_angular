import { Routes } from '@angular/router';

import { Shell } from './shell/components/shell/shell';

import { Login } from './features/auth/pages/login/login';

import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { Collection } from './features/collection/pages/collection/collection';
import { Databank } from './features/databank/pages/databank/databank';
import { Wishlist } from './features/wishlist/pages/wishlist/wishlist';
import { Identify } from './features/ai-identify/pages/identify/identify';
import { Scan } from './features/barcode-scan/pages/scan/scan';
import { Profile } from './features/profile/pages/profile/profile';

export const routes: Routes = [

  {
    path: 'login',
    component: Login,
  },

  {
    path: '',
    component: Shell,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'collection',
        component: Collection,
      },

      {
        path: 'databank',
        component: Databank,
      },

      {
        path: 'wishlist',
        component: Wishlist,
      },

      {
        path: 'identify',
        component: Identify,
      },

      {
        path: 'scan',
        component: Scan,
      },

      {
        path: 'profile',
        component: Profile,
      },

    ],

  },

  {
    path: '**',
    redirectTo: '',
  },

];