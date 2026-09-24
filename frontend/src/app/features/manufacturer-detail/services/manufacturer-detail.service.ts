import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ManufacturerDetailModel } from '../models/manufacturer-detail.model';

@Injectable({ providedIn: 'root' })
export class ManufacturerDetailService {
  private readonly http = inject(HttpClient);
  getById(id: string) { return this.http.get<ManufacturerDetailModel>(`${environment.apiUrl}/manufacturers/${id}`); }
}
