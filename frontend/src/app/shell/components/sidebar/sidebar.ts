import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavigationItem } from '../../models/navigation-item.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  readonly navigation: NavigationItem[];

  constructor(
    private readonly navigationService: NavigationService,
  ) {

    this.navigation = this.navigationService.navigation;

  }

}