import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly rememberKey = 'remember_session';

  getAccessToken(): string | null { return this.get(this.accessTokenKey); }
  getRefreshToken(): string | null { return this.get(this.refreshTokenKey); }

  setRemembered(remember: boolean): void {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
    localStorage.setItem(this.rememberKey, String(remember));
    if (accessToken) this.store(this.accessTokenKey, accessToken);
    if (refreshToken) this.store(this.refreshTokenKey, refreshToken);
  }

  setAccessToken(token: string): void { this.store(this.accessTokenKey, token); }
  setRefreshToken(token: string): void { this.store(this.refreshTokenKey, token); }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.accessTokenKey);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
  }

  clear(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    localStorage.removeItem(this.rememberKey);
  }

  isLoggedIn(): boolean { return !!this.getAccessToken(); }

  private get(key: string): string | null {
    // Existing sessions remain remembered unless the user explicitly chose otherwise.
    return localStorage.getItem(key) ?? sessionStorage.getItem(key);
  }

  private store(key: string, value: string): void {
    if (localStorage.getItem(this.rememberKey) !== 'false') {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  }
}
