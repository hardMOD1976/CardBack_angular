import {
  Injectable,
  inject,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { FranchiseDetailModel } from '../models/franchise-detail.model';

@Injectable({
  providedIn: 'root',
})
export class FranchiseDetailService {
  private readonly http = inject(HttpClient);

  getById(
    id: string,
  ): Observable<FranchiseDetailModel> {
    return this.http.get<FranchiseDetailModel>(
      `${environment.apiUrl}/franchises/${id}`,
    );
  }
}