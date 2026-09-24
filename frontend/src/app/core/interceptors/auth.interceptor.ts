import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../auth/token.service';
import { RefreshSessionService } from '../auth/refresh-session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokens = inject(TokenService);
  const refreshSession = inject(RefreshSessionService);
  const router = inject(Router);
  const isAuthRequest = /\/auth\/(login|register|refresh|config|password\/)/.test(req.url);
  const accessToken = tokens.getAccessToken();
  if (!accessToken || isAuthRequest) return next(req);

  const authenticatedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  return next(authenticatedRequest).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status !== 401) return throwError(() => error);
    if (!tokens.getRefreshToken()) {
      tokens.clear();
      void router.navigateByUrl('/welcome');
      return throwError(() => error);
    }
    return refreshSession.refresh().pipe(
      switchMap((session) => next(req.clone({ setHeaders: { Authorization: `Bearer ${session.accessToken}` } }))),
      catchError((refreshError) => {
        tokens.clear();
        void router.navigateByUrl('/welcome');
        return throwError(() => refreshError);
      }),
    );
  }));
};
