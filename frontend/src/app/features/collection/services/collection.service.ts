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
import { OwnedFigureModel } from '../models/owned-figure.model';

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
  ): Observable<CollectionResponse<OwnedFigureModel>> {
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

    return this.http.get<CollectionResponse<OwnedFigureModel>>(
      this.apiUrl,
      { params },
    );
  }

  addOwnedFigure(data: { productReleaseId: string; condition: string; completeness: string; packagingState?: string; purchasePrice?: number; currency?: string; purchaseDate?: string; purchaseLocation?: string; estimatedMarketValue?: number; storageLocation?: string; notes?: string; quantity?: number }) {
    return this.http.post<OwnedFigureModel>(this.apiUrl, data);
  }

  updateOwnedFigure(id: string, data: Partial<Pick<OwnedFigureModel, 'condition' | 'completeness' | 'packagingState' | 'purchaseDate' | 'purchasePrice' | 'currency' | 'purchaseLocation' | 'estimatedMarketValue' | 'storageLocation' | 'notes' | 'quantity'>>) {
    return this.http.put<OwnedFigureModel>(`${this.apiUrl}/${id}`, data);
  }

  removeOwnedFigure(id: string) {
    return this.http.delete<{ id: string; deleted: boolean }>(`${this.apiUrl}/${id}`);
  }

  getStats() {
    return this.http.get<{
      totalEntries: number; totalCopies: number; purchaseValue: number; estimatedValue: number;
      recent: OwnedFigureModel[];
    }>(`${this.apiUrl}/stats`);
  }
}
