import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FigureDetailModel } from '../models/figure-detail.model';

@Injectable({ providedIn: 'root' })
export class FigureDetailService {
  private readonly http = inject(HttpClient);
  getById(id: string) { return this.http.get<FigureDetailModel>(`${environment.apiUrl}/figures/${id}`); }
}
