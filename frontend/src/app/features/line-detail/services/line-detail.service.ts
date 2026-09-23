import {
  Injectable,
  inject,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import {
  LineDetailModel,
} from '../models/line-detail.model';

@Injectable({
  providedIn: 'root',
})
export class LineDetailService {
  private readonly http = inject(HttpClient);

  getById(
    id: string,
  ): Observable<LineDetailModel> {
    return this.http.get<LineDetailModel>(
      `${environment.apiUrl}/lines/${id}`,
    );
  }
}