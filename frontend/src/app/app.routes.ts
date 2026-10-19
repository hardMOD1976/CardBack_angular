import { Routes } from '@angular/router';

import { Shell } from './shell/components/shell/shell';

import { Login } from './features/auth/pages/login/login';
import { Welcome } from './features/auth/pages/welcome/welcome';

import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { Collection } from './features/collection/pages/collection/collection';
import { Databank } from './features/databank/pages/databank/databank';
import { Wishlist } from './features/wishlist/pages/wishlist/wishlist';
import { Identify } from './features/ai-identify/pages/identify/identify';
import { Scan } from './features/barcode-scan/pages/scan/scan';
import { Profile } from './features/profile/pages/profile/profile';
import { GlobalSearch } from './features/global-search/pages/global-search/global-search';

import { FranchiseDetail } from './features/franchise-detail/pages/franchise-detail';
import { LineDetail } from './features/line-detail/pages/line-detail';
import { FigureDetail } from './features/figure-detail/pages/figure-detail/figure-detail';
import { ManufacturerDetail } from './features/manufacturer-detail/pages/manufacturer-detail/manufacturer-detail';
import { CharacterDetail } from './features/character-detail/pages/character-detail/character-detail';
import { VariantDetail } from './features/variant-detail/pages/variant-detail/variant-detail';
import { ProductReleaseDetail } from './features/product-release-detail/pages/product-release-detail/product-release-detail';
import { ManufacturersAdmin } from './features/admin/pages/manufacturers-admin/manufacturers-admin';

import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    component: Welcome,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome',
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
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
      {
        path: 'search',
        component: GlobalSearch,
      },
      {
        path: 'franchises/:id',
        component: FranchiseDetail,
      },
      {
        path: 'lines/:id',
        component: LineDetail,
      },
      {
        path: 'figures/:id',
        component: FigureDetail,
      },
      {
        path: 'manufacturers/:id',
        component: ManufacturerDetail,
      },
      {
        path: 'characters/:id',
        component: CharacterDetail,
      },
      {
        path: 'variants/:id',
        component: VariantDetail,
      },
      {
        path: 'product-releases/:id',
        component: ProductReleaseDetail,
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
          {
            path: 'manufacturers',
            component: ManufacturersAdmin,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
