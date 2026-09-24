import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

import { TokenService } from '../../../core/auth/token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  // Auth API endpoint
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials,
    );

  }

  register(request: { username: string; displayName: string; email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, request);
  }

  configuration(): Observable<{ passwordRecoveryEnabled: boolean }> {
    return this.http.get<{ passwordRecoveryEnabled: boolean }>(`${this.apiUrl}/config`);
  }

  forgotPassword(request: { email: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/password/forgot`, request);
  }

  resetPassword(request: { token: string; password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/password/reset`, request);
  }

  changePassword(request: { currentPassword: string; newPassword: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/password/change`, request);
  }

  refresh(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh`, { refreshToken });
  }

 logout(): Observable<void> {

  return this.http.post<void>(
    `${this.apiUrl}/logout`,
    {},
  ).pipe(

    tap(() => {

      this.tokenService.clear();

    }),

  );

}

}
