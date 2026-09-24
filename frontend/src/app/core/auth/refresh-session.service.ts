import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { LoginResponse } from '../../features/auth/models/login-response.model';

@Injectable({ providedIn: 'root' })
export class RefreshSessionService {
  private readonly http = new HttpClient(inject(HttpBackend));
  private readonly tokens = inject(TokenService);
  private inFlight: Observable<LoginResponse> | null = null;

  refresh(): Observable<LoginResponse> {
    if (this.inFlight) return this.inFlight;
    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token is available.');
    this.inFlight = this.http.post<LoginResponse>(`${environment.apiUrl}/auth/refresh`, { refreshToken }).pipe(
      tap((result) => {
        this.tokens.setAccessToken(result.accessToken);
        this.tokens.setRefreshToken(result.refreshToken);
      }),
      finalize(() => { this.inFlight = null; }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    return this.inFlight;
  }
}
