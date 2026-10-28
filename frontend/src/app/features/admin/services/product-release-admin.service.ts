
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import {
  ProductReleaseAdminPaginatedResponse,
  ProductReleaseAdminPayload,
  ProductReleaseAdminReferenceResponse,
  ProductReleaseAdminModel,
} from '../models/product-release-admin.model';

@Injectable({
  providedIn: 'root',
})
export class ProductReleaseAdminService {
  private readonly http = inject(HttpClient);

  private readonly productReleasesUrl =
    `${environment.apiUrl}/product-releases`;

  private readonly variantsUrl =
    `${environment.apiUrl}/variants`;

  getAll(
    page = 1,
    limit = 10,
    search = '',
  ): Observable<ProductReleaseAdminPaginatedResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<ProductReleaseAdminPaginatedResponse>(
      this.productReleasesUrl,
      { params },
    );
  }

  getVariants(
    page = 1,
    limit = 100,
    search = '',
  ): Observable<ProductReleaseAdminReferenceResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<ProductReleaseAdminReferenceResponse>(
      this.variantsUrl,
      { params },
    );
  }

  create(
    payload: ProductReleaseAdminPayload,
  ): Observable<ProductReleaseAdminModel> {
    return this.http.post<ProductReleaseAdminModel>(
      this.productReleasesUrl,
      payload,
    );
  }

  update(
    id: string,
    payload: ProductReleaseAdminPayload,
  ): Observable<ProductReleaseAdminModel> {
    return this.http.put<ProductReleaseAdminModel>(
      `${this.productReleasesUrl}/${id}`,
      payload,
    );
  }

  remove(
    id: string,
  ): Observable<{ id: string; deletedAt: string }> {
    return this.http.delete<{ id: string; deletedAt: string }>(
      `${this.productReleasesUrl}/${id}`,
    );
  }
}
