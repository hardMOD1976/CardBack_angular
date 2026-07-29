import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { CurrentUser } from '../../features/auth/models/current-user.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {

  private readonly tokenService =
    inject(TokenService);

  getCurrentUser(): CurrentUser | null {

    const token =
      this.tokenService.getAccessToken();

    if (!token) {

      return null;

    }

    try {

      const payload = JSON.parse(
        atob(token.split('.')[1]),
      );

      return {

        id: payload.sub,

        username: payload.username,

        email: '',

        role: payload.role,

      };

    } catch {

      return null;

    }

  }

}