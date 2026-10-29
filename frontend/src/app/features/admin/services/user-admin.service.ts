import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import {
  ArchiveUserAdminResponse,
  CreateUserAdminRequest,
  UpdateUserAdminRequest,
  UserAdmin,
} from '../models/user-admin.model';

@Injectable({
  providedIn: 'root',
})
export class UserAdminService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/users`;

  getUsers(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(this.apiUrl);
  }

  getUser(id: string): Observable<UserAdmin> {
    return this.http.get<UserAdmin>(`${this.apiUrl}/${id}`);
  }

  createUser(
    payload: CreateUserAdminRequest,
  ): Observable<UserAdmin> {
    return this.http.post<UserAdmin>(
      this.apiUrl,
      payload,
    );
  }

  updateUser(
    id: string,
    payload: UpdateUserAdminRequest,
  ): Observable<UserAdmin> {
    return this.http.put<UserAdmin>(
      `${this.apiUrl}/${id}`,
      payload,
    );
  }

  archiveUser(
    id: string,
  ): Observable<ArchiveUserAdminResponse> {
    return this.http.delete<ArchiveUserAdminResponse>(
      `${this.apiUrl}/${id}`,
    );
  }
}