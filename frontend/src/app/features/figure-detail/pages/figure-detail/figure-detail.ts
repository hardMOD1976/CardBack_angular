import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { FigureDetailService } from '../../services/figure-detail.service';
import { FigureDetailModel } from '../../models/figure-detail.model';

@Component({ selector: 'app-figure-detail', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './figure-detail.html', styleUrl: './figure-detail.scss' })
export class FigureDetail {
  private readonly route = inject(ActivatedRoute); private readonly destroyRef = inject(DestroyRef); private readonly service = inject(FigureDetailService);
  readonly data = signal<FigureDetailModel | null>(null); readonly loading = signal(true); readonly error = signal(false); readonly notFound = signal(false);
  releaseCount(figure: FigureDetailModel): number { return figure.variants.reduce((sum, variant) => sum + variant.productReleases.length, 0); }
  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => {
      this.loading.set(true); this.error.set(false); this.notFound.set(false); this.data.set(null);
      const id = params.get('id'); if (!id) { this.notFound.set(true); this.loading.set(false); return of(null); }
      return this.service.getById(id).pipe(catchError((e) => { e.status === 404 ? this.notFound.set(true) : this.error.set(true); return of(null); }), finalize(() => this.loading.set(false)));
    }), takeUntilDestroyed(this.destroyRef)).subscribe((data) => this.data.set(data));
  }
}
