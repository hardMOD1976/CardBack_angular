import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { Card } from '../../../../shared/ui/card/card';
import { Input } from '../../../../shared/ui/input/input';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    Card,
    Input,
    Button,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  email = '';

  password = '';

  login(): void {

    this.authService.login({

      email: this.email,

      password: this.password,

    }).subscribe({

      next: response => {

        console.log(response);

        // El següent pas serà guardar el JWT.

        this.router.navigateByUrl('/');

      },

      error: error => {

        console.error(error);

      }

    });

  }

}