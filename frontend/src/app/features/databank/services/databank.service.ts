import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ProductReleaseModel } from '../models/product-release.model';

@Injectable({
  providedIn: 'root',
})
export class DatabankService {

  private readonly http =
    inject(HttpClient);

  getProductReleases():

    Observable<{

      data: ProductReleaseModel[];

      page: number;

      limit: number;

      total: number;

      totalPages: number;

    }> {

    return this.http.get<any>(
      `${environment.apiUrl}/product-releases`,
    );

  }

}