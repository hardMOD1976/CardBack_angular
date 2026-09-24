import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { VariantDetailService } from '../../services/variant-detail.service';
import { VariantDetailModel } from '../../models/variant-detail.model';

@Component({ selector: 'app-variant-detail', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './variant-detail.html', styleUrl: './variant-detail.scss' })
export class VariantDetail {
  private readonly route = inject(ActivatedRoute); private readonly destroyRef = inject(DestroyRef); private readonly service = inject(VariantDetailService);
  readonly data = signal<VariantDetailModel | null>(null); readonly loading = signal(true); readonly error = signal(false); readonly notFound = signal(false);
  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => {
      this.loading.set(true); this.error.set(false); this.notFound.set(false); this.data.set(null);
      const id = params.get('id'); if (!id) { this.notFound.set(true); this.loading.set(false); return of(null); }
      return this.service.getById(id).pipe(catchError((e) => { e.status === 404 ? this.notFound.set(true) : this.error.set(true); return of(null); }), finalize(() => this.loading.set(false)));
    }), takeUntilDestroyed(this.destroyRef)).subscribe((data) => this.data.set(data));
  }
}
