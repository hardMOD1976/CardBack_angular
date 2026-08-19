import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { CurrentUserService } from '../../../core/auth/current-user.service';

import { CurrentUser } from '../../../features/auth/models/current-user.model';

import { AuthService } from '../../../features/auth/services/auth.service';

import { ThemeService } from '../../../core/services/theme.service';

import { Input } from '../../../shared/ui/input/input';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    Input,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly currentUserService =
    inject(CurrentUserService);

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  protected readonly themeService =
    inject(ThemeService);

  readonly user: CurrentUser | null =
    this.currentUserService.getCurrentUser();

  searchQuery = '';

  get welcomeMessage(): string {
    // Quan tinguem la col·lecció carregada,
    // aquí decidirem entre "Welcome" i "Welcome back"
    return 'Welcome back';
  }

  get userInitial(): string {
    return this.user?.username
      ?.charAt(0)
      .toUpperCase() ?? '?';
  }

  search(): void {
    const normalizedQuery =
      this.searchQuery.trim();

    if (!normalizedQuery) {
      return;
    }

    this.router.navigate(
      ['/search'],
      {
        queryParams: {
          q: normalizedQuery,
        },
      },
    );
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: console.error,
      });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get themeIcon(): string {
    return this.themeService.theme() === 'light' ? '🌙' : '☀️';
  }

  get themeLabel(): string {
    return this.themeService.theme() === 'light' 
      ? 'Switch to dark mode' 
      : 'Switch to light mode';
  }
}