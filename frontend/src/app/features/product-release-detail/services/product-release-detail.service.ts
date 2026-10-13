import {
  Injectable,
  inject,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { ProductReleaseDetailModel } from '../models/product-release-detail.model';

@Injectable({
  providedIn: 'root',
})
export class ProductReleaseDetailService {
  private readonly http = inject(HttpClient);

  getById(id: string) {
    return this.http.get<ProductReleaseDetailModel>(
      `${environment.apiUrl}/product-releases/${id}`,
    );
  }
}