import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CurrentUserService } from '../../../core/auth/current-user.service';
import { ThemeService } from '../../../core/services/theme.service';
import { NavigationItem } from '../../models/navigation-item.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly themeService = inject(ThemeService);
  private readonly navigationService = inject(NavigationService);
  private readonly currentUserService = inject(CurrentUserService);

  readonly theme = this.themeService.theme;

  get navigation(): NavigationItem[] {
    const role = this.currentUserService.getCurrentUser()?.role;

    return this.navigationService.navigation.filter(
      (item) => !item.roles || (!!role && item.roles.includes(role)),
    );
  }

  get logoPath(): string {
    return this.themeService.theme() === 'light'
      ? 'assets/Logo_v1_var6_POS_blue.png'
      : 'assets/Logo_v1_var6_NEG_blue.png';
  }
}
