import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { CurrentUserService } from '../../../core/auth/current-user.service';

import { CurrentUser } from '../../../features/auth/models/current-user.model';

import { AuthService } from '../../../features/auth/services/auth.service';

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
}