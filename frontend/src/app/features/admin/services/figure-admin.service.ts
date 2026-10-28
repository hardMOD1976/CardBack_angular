
import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import {
  FigureAdminModel,
  FigureAdminPaginatedResponse,
  FigureAdminPayload,
  FigureAdminReferenceResponse,
  FigureAdminWriteResponse,
} from '../models/figure-admin.model';

@Injectable({
  providedIn: 'root',
})
export class FigureAdminService {
  private readonly http = inject(HttpClient);

  private readonly figuresUrl = `${environment.apiUrl}/figures`;
  private readonly charactersUrl = `${environment.apiUrl}/characters`;
  private readonly linesUrl = `${environment.apiUrl}/lines`;

  getAll(
    page = 1,
    limit = 10,
    search = '',
  ): Observable<FigureAdminPaginatedResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<FigureAdminPaginatedResponse>(
      this.figuresUrl,
      { params },
    );
  }

  getCharacters(
    page = 1,
    limit = 100,
    search = '',
  ): Observable<FigureAdminReferenceResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<FigureAdminReferenceResponse>(
      this.charactersUrl,
      { params },
    );
  }

  getLines(
    page = 1,
    limit = 100,
    search = '',
  ): Observable<FigureAdminReferenceResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<FigureAdminReferenceResponse>(
      this.linesUrl,
      { params },
    );
  }

  create(
    payload: FigureAdminPayload,
  ): Observable<FigureAdminWriteResponse> {
    return this.http.post<FigureAdminWriteResponse>(
      this.figuresUrl,
      payload,
    );
  }

  update(
    id: string,
    payload: FigureAdminPayload,
  ): Observable<FigureAdminWriteResponse> {
    return this.http.put<FigureAdminWriteResponse>(
      `${this.figuresUrl}/${id}`,
      payload,
    );
  }

  remove(id: string): Observable<{ id: string; deletedAt: string }> {
    return this.http.delete<{ id: string; deletedAt: string }>(
      `${this.figuresUrl}/${id}`,
    );
  }
}
