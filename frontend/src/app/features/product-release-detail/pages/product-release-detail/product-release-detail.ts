import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { ProductReleaseDetailService } from '../../services/product-release-detail.service';
import { ProductReleaseDetailModel } from '../../models/product-release-detail.model';
import { CollectionService } from '../../../collection/services/collection.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({ selector: 'app-product-release-detail', standalone: true, imports: [CommonModule, RouterLink, ReactiveFormsModule], templateUrl: './product-release-detail.html', styleUrl: './product-release-detail.scss' })
export class ProductReleaseDetail {
  private readonly route = inject(ActivatedRoute); private readonly destroyRef = inject(DestroyRef); private readonly service = inject(ProductReleaseDetailService);
  private readonly collectionService = inject(CollectionService); private readonly wishlistService = inject(WishlistService); private readonly fb = inject(FormBuilder);
  readonly data = signal<ProductReleaseDetailModel | null>(null); readonly loading = signal(true); readonly error = signal(false); readonly notFound = signal(false);
  readonly savingCollection = signal(false); readonly savingWishlist = signal(false); readonly wishlistEntryId = signal<string | null>(null); readonly notice = signal(''); readonly actionError = signal('');
  readonly collectionForm = this.fb.nonNullable.group({ condition: ['Good', Validators.required], completeness: ['Complete', Validators.required], packagingState: ['Opened'], quantity: [1, [Validators.required, Validators.min(1)]], purchasePrice: [0, Validators.min(0)], currency: ['EUR'] });
  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => {
      this.loading.set(true); this.error.set(false); this.notFound.set(false); this.data.set(null);
      const id = params.get('id'); if (!id) { this.notFound.set(true); this.loading.set(false); return of(null); }
      return this.service.getById(id).pipe(catchError((e) => { e.status === 404 ? this.notFound.set(true) : this.error.set(true); return of(null); }), finalize(() => this.loading.set(false)));
    }), takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.data.set(data);
      if (data) this.refreshWishlistState(data.id);
    });
  }

  addToCollection(): void {
    const release = this.data();
    if (!release || this.collectionForm.invalid) { this.collectionForm.markAllAsTouched(); return; }
    this.savingCollection.set(true); this.actionError.set(''); this.notice.set('');
    const { purchasePrice, currency, ...details } = this.collectionForm.getRawValue();
    this.collectionService.addOwnedFigure({ productReleaseId: release.id, ...details, ...(purchasePrice > 0 ? { purchasePrice, currency } : {}) }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.savingCollection.set(false); this.notice.set('Added to your collection.'); },
      error: (error) => { this.savingCollection.set(false); this.actionError.set(error.error?.message || 'Could not add this release to your collection.'); },
    });
  }

  toggleWishlist(): void {
    const release = this.data(); if (!release) return;
    this.savingWishlist.set(true); this.actionError.set(''); this.notice.set('');
    const entryId = this.wishlistEntryId();
    const request = entryId
      ? this.wishlistService.remove(entryId).pipe(map(() => ({ id: null as string | null })))
      : this.wishlistService.add(release.id).pipe(map((entry) => ({ id: entry.id as string | null })));
    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result) => {
        this.wishlistEntryId.set(result.id);
        this.savingWishlist.set(false); this.notice.set(entryId ? 'Removed from your wishlist.' : 'Saved to your wishlist.');
      },
      error: (error) => { this.savingWishlist.set(false); this.actionError.set(error.error?.message || 'Could not update your wishlist.'); },
    });
  }

  private refreshWishlistState(productReleaseId: string): void {
    this.wishlistService.getMine().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (entries) => this.wishlistEntryId.set(entries.find((entry) => entry.productRelease.id === productReleaseId)?.id ?? null),
    });
  }
}
