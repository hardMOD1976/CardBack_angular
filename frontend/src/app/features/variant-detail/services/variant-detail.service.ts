import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { VariantDetailModel } from '../models/variant-detail.model';

@Injectable({ providedIn: 'root' })
export class VariantDetailService {
  private readonly http = inject(HttpClient);
  getById(id: string) { return this.http.get<VariantDetailModel>(`${environment.apiUrl}/variants/${id}`); }
}
