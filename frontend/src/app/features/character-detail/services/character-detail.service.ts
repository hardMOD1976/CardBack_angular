import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CharacterDetailModel } from '../models/character-detail.model';

@Injectable({ providedIn: 'root' })
export class CharacterDetailService {
  private readonly http = inject(HttpClient);
  getById(id: string) { return this.http.get<CharacterDetailModel>(`${environment.apiUrl}/characters/${id}`); }
}
