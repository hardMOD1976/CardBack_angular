import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { Card } from '../../../../shared/ui/card/card';
import { Button } from '../../../../shared/ui/button/button';

import { TokenService } from '../../../../core/auth/token.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    Card,
    Button,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private readonly authService = inject(AuthService);

  private readonly tokenService = inject(TokenService);

  private readonly router = inject(Router);

  private readonly fb = inject(FormBuilder);

  readonly loginForm = this.fb.nonNullable.group({

    identifier: ['', [
      Validators.required,
    ]],

    password: ['', [
      Validators.required,
    ]],

  });

  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({

      next: response => {

  this.tokenService.setAccessToken(response.accessToken);

  this.tokenService.setRefreshToken(response.refreshToken);

  this.router.navigateByUrl('/dashboard');

},

      error: error => {

        console.error(error);

      },

    });

  }

}