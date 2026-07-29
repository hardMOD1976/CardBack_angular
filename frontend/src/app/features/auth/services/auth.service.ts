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
  authService: any;
  router: any;

  login(credentials: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials,
    );

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