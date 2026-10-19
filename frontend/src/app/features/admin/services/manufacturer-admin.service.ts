import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ManufacturerAdminModel,
  ManufacturerAdminPaginatedResponse,
  ManufacturerAdminPayload,
} from '../models/manufacturer-admin.model';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerAdminService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/manufacturers`;

  getAll(
    page = 1,
    limit = 10,
    search = '',
  ): Observable<ManufacturerAdminPaginatedResponse> {
    return this.http.get<ManufacturerAdminPaginatedResponse>(this.baseUrl, {
      params: {
        page,
        limit,
        search,
      },
    });
  }

  create(
    payload: ManufacturerAdminPayload,
  ): Observable<ManufacturerAdminModel> {
    return this.http.post<ManufacturerAdminModel>(this.baseUrl, payload);
  }

  update(
    id: string,
    payload: ManufacturerAdminPayload,
  ): Observable<ManufacturerAdminModel> {
    return this.http.put<ManufacturerAdminModel>(
      `${this.baseUrl}/${id}`,
      payload,
    );
  }

  remove(
    id: string,
  ): Observable<{ id: string; deletedAt: string }> {
    return this.http.delete<{ id: string; deletedAt: string }>(
      `${this.baseUrl}/${id}`,
    );
  }
}
