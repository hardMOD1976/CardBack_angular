import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);

  // Auth API endpoint
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials,
    );

  }

}