
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import {
  VariantAdminPaginatedResponse,
  VariantAdminPayload,
  VariantAdminReferenceResponse,
  VariantAdminWriteResponse,
} from '../models/variant-admin.model';

@Injectable({
  providedIn: 'root',
})
export class VariantAdminService {
  private readonly http = inject(HttpClient);

  private readonly variantsUrl = `${environment.apiUrl}/variants`;
  private readonly figuresUrl = `${environment.apiUrl}/figures`;

  getAll(
    page = 1,
    limit = 10,
    search = '',
  ): Observable<VariantAdminPaginatedResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<VariantAdminPaginatedResponse>(
      this.variantsUrl,
      { params },
    );
  }

  getFigures(
    page = 1,
    limit = 100,
    search = '',
  ): Observable<VariantAdminReferenceResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<VariantAdminReferenceResponse>(
      this.figuresUrl,
      { params },
    );
  }

  create(
    payload: VariantAdminPayload,
  ): Observable<VariantAdminWriteResponse> {
    return this.http.post<VariantAdminWriteResponse>(
      this.variantsUrl,
      payload,
    );
  }

  update(
    id: string,
    payload: VariantAdminPayload,
  ): Observable<VariantAdminWriteResponse> {
    return this.http.put<VariantAdminWriteResponse>(
      `${this.variantsUrl}/${id}`,
      payload,
    );
  }

  remove(
    id: string,
  ): Observable<{ id: string; deletedAt: string }> {
    return this.http.delete<{ id: string; deletedAt: string }>(
      `${this.variantsUrl}/${id}`,
    );
  }
}
