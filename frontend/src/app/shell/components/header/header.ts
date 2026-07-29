import { Component, inject } from '@angular/core';

import { CurrentUserService } from '../../../core/auth/current-user.service';
import { CurrentUser } from '../../../features/auth/models/current-user.model';

import { Input } from '../../../shared/ui/input/input';
import { Button } from "../../../shared/ui/button/button";
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Input, Button],
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