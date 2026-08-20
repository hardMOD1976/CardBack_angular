import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

interface NavItem {
  route: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;

  navigation: NavItem[] = [
    { route: '/dashboard', label: 'Dashboard' },
    { route: '/collection', label: 'Collection' },
    { route: '/databank', label: 'Databank' },
    { route: '/wishlist', label: 'Wishlist' },
    { route: '/identify', label: 'AI Identify' },
    { route: '/scan', label: 'Scan Barcode' },
    { route: '/profile', label: 'Profile' },
  ];

  get logoPath(): string {
    return this.themeService.theme() === 'light'
      ? 'assets/Logo_v1_var6_POS_blue.png'
      : 'assets/Logo_v1_var6_NEG_blue.png';
  }
}