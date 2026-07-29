import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';

  // ==========================
  // Access Token
  // ==========================

  getAccessToken(): string | null {

    return localStorage.getItem(this.accessTokenKey);

  }

  setAccessToken(token: string): void {

    localStorage.setItem(this.accessTokenKey, token);

  }

  removeAccessToken(): void {

    localStorage.removeItem(this.accessTokenKey);

  }

  // ==========================
  // Refresh Token
  // ==========================

  getRefreshToken(): string | null {

    return localStorage.getItem(this.refreshTokenKey);

  }

  setRefreshToken(token: string): void {

    localStorage.setItem(this.refreshTokenKey, token);

  }

  removeRefreshToken(): void {

    localStorage.removeItem(this.refreshTokenKey);

  }

  // ==========================
  // Helpers
  // ==========================

  clear(): void {

    this.removeAccessToken();
    this.removeRefreshToken();

  }

  isLoggedIn(): boolean {

    return !!this.getAccessToken();

  }

}