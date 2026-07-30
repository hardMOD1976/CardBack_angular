import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ProductReleaseModel } from '../models/product-release.model';

export interface PaginatedResponse<T> {

  data: T[];

  page: number;

  limit: number;

  total: number;

  totalPages: number;

}

@Injectable({
  providedIn: 'root',
})
export class DatabankService {

  private readonly http =
    inject(HttpClient);

  getProductReleases(
    page = 1,
    limit = 20,
    search = '',
  ): Observable<PaginatedResponse<ProductReleaseModel>> {

    return this.http.get<PaginatedResponse<ProductReleaseModel>>(
      `${environment.apiUrl}/product-releases`,
      {
        params: {
          page,
          limit,
          search,
        },
      },
    );

  }

}