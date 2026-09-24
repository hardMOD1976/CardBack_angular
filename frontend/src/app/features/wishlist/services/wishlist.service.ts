import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { WishlistEntryModel } from '../models/wishlist-entry.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/wishlist`;
  getMine() { return this.http.get<WishlistEntryModel[]>(this.url); }
  add(productReleaseId: string) { return this.http.post<WishlistEntryModel>(this.url, { productReleaseId }); }
  remove(id: string) { return this.http.delete<{ id: string; removed: boolean }>(`${this.url}/${id}`); }
}
