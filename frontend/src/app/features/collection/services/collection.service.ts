import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface CollectionQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  condition?: string;
  completeness?: string;
  packagingState?: string;
}

export interface CollectionResponse<T = any> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/owned-figures`;

  getMyCollection(
    query: CollectionQuery = {},
  ): Observable<CollectionResponse<any>> {
    let params = new HttpParams();

    if (query.page !== undefined) {
      params = params.set(
        'page',
        query.page.toString(),
      );
    }

    if (query.limit !== undefined) {
      params = params.set(
        'limit',
        query.limit.toString(),
      );
    }

    if (query.search?.trim()) {
      params = params.set(
        'search',
        query.search.trim(),
      );
    }

    if (query.sortBy) {
      params = params.set(
        'sortBy',
        query.sortBy,
      );
    }

    if (query.sortOrder) {
      params = params.set(
        'sortOrder',
        query.sortOrder,
      );
    }

    if (query.condition) {
      params = params.set(
        'condition',
        query.condition,
      );
    }

    if (query.completeness) {
      params = params.set(
        'completeness',
        query.completeness,
      );
    }

    if (query.packagingState) {
      params = params.set(
        'packagingState',
        query.packagingState,
      );
    }

    return this.http.get<CollectionResponse<any>>(
      this.apiUrl,
      { params },
    );
  }
}