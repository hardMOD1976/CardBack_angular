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

import {
  GlobalSearchQuery,
  GlobalSearchResponse,
} from '../models/global-search.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchService {
  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/search`;

  search(
    query: GlobalSearchQuery = {},
  ): Observable<GlobalSearchResponse> {
    let params = new HttpParams();

    if (query.q?.trim()) {
      params = params.set(
        'q',
        query.q.trim(),
      );
    }

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

    return this.http.get<GlobalSearchResponse>(
      this.apiUrl,
      { params },
    );
  }
}