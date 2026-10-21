import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  LineAdminModel,
  LineAdminPaginatedResponse,
  LineAdminPayload,
  LineAdminReferenceResponse,
  LineAdminWriteResponse,
} from '../models/line-admin.model';

@Injectable({
  providedIn: 'root',
})
export class LineAdminService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/lines`;
  private readonly manufacturersUrl = `${environment.apiUrl}/manufacturers`;
  private readonly franchisesUrl = `${environment.apiUrl}/franchises`;

  getAll(
    page = 1,
    limit = 10,
    search = '',
  ): Observable<LineAdminPaginatedResponse> {
    return this.http.get<LineAdminPaginatedResponse>(this.baseUrl, {
      params: { page, limit, search },
    });
  }

  getManufacturers(
    page = 1,
    limit = 100,
  ): Observable<LineAdminReferenceResponse> {
    return this.http.get<LineAdminReferenceResponse>(this.manufacturersUrl, {
      params: { page, limit },
    });
  }

  getFranchises(
    page = 1,
    limit = 100,
  ): Observable<LineAdminReferenceResponse> {
    return this.http.get<LineAdminReferenceResponse>(this.franchisesUrl, {
      params: { page, limit },
    });
  }

  create(payload: LineAdminPayload): Observable<LineAdminWriteResponse> {
    return this.http.post<LineAdminWriteResponse>(this.baseUrl, payload);
  }

  update(
    id: string,
    payload: LineAdminPayload,
  ): Observable<LineAdminWriteResponse> {
    return this.http.put<LineAdminWriteResponse>(
      `${this.baseUrl}/${id}`,
      payload,
    );
  }

  remove(id: string): Observable<{ id: string; deletedAt: string }> {
    return this.http.delete<{ id: string; deletedAt: string }>(
      `${this.baseUrl}/${id}`,
    );
  }
}
