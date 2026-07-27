import { Injectable } from '@angular/core';

import { NavigationItem } from '../models/navigation-item.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {

  readonly navigation: NavigationItem[] = [

    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
    },

    {
      label: 'My Collection',
      route: '/collection',
      icon: 'inventory',
    },

    {
      label: 'Databank',
      route: '/databank',
      icon: 'database',
    },

    {
      label: 'Wishlist',
      route: '/wishlist',
      icon: 'favorite',
    },

    {
      label: 'AI Identify',
      route: '/identify',
      icon: 'smart-toy',
    },

    {
      label: 'Scan Barcode',
      route: '/scan',
      icon: 'qr-code-scanner',
    },

    {
      label: 'Profile',
      route: '/profile',
      icon: 'person',
    },

  ];

}