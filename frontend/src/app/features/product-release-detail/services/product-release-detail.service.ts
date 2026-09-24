import { Injectable, inject } from '@angular/core';
import { DatabankService } from '../../databank/services/databank.service';

@Injectable({ providedIn: 'root' })
export class ProductReleaseDetailService {
  private readonly databank = inject(DatabankService);
  getById(id: string) { return this.databank.getById(id); }
}
