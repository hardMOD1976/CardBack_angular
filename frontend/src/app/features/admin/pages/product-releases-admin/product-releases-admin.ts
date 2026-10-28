import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Input as CbInput } from '../../../../shared/ui/input/input';

import {
  ProductReleaseAdminModel,
  ProductReleaseAdminPayload,
  ProductReleaseAdminReference,
} from '../../models/product-release-admin.model';

import { ProductReleaseAdminService } from '../../services/product-release-admin.service';

interface ProductReleaseFormState {
  name: string;
  barcode: string;
  releaseDate: string;
  packagingType: string;
  region: string;
  language: string;
  retailer: string;
  notes: string;
  imageUrl: string;
  variantId: string;
}

const EMPTY_FORM: ProductReleaseFormState = {
  name: '',
  barcode: '',
  releaseDate: '',
  packagingType: '',
  region: '',
  language: '',
  retailer: '',
  notes: '',
  imageUrl: '',
  variantId: '',
};

@Component({
  selector: 'app-product-releases-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CbInput],
  templateUrl: './product-releases-admin.html',
  styleUrl: './product-releases-admin.scss',
})
export class ProductReleasesAdmin {
  private readonly productReleaseAdminService = inject(
    ProductReleaseAdminService,
  );

  readonly productReleases = signal<ProductReleaseAdminModel[]>([]);
  readonly variants = signal<ProductReleaseAdminReference[]>([]);

  readonly loading = signal(false);
  readonly loadingReferences = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);

  readonly page = signal(1);
  readonly limit = signal(10);
  readonly total = signal(0);
  readonly totalPages = signal(0);

  readonly errorMessage = signal('');
  readonly referenceErrorMessage = signal('');
  readonly formErrorMessage = signal('');

  searchTerm = '';
  variantSearchTerm = '';

  formVisible = false;
  editingId: string | null = null;
  form: ProductReleaseFormState = { ...EMPTY_FORM };

  constructor() {
    this.loadProductReleases();
    this.loadReferences();
  }

  loadProductReleases(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productReleaseAdminService
      .getAll(this.page(), this.limit(), this.searchTerm)
      .subscribe({
        next: (response) => {
          this.productReleases.set(response.data);
          this.page.set(response.page);
          this.limit.set(response.limit);
          this.total.set(response.total);
          this.totalPages.set(response.totalPages);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage.set(
            this.readApiMessage(
              error,
              'Could not load product releases.',
            ),
          );
          this.loading.set(false);
        },
      });
  }

  loadReferences(search = this.variantSearchTerm): void {
    this.loadingReferences.set(true);
    this.referenceErrorMessage.set('');

    forkJoin({
      variants: this.productReleaseAdminService.getVariants(
        1,
        100,
        search,
      ),
    }).subscribe({
      next: ({ variants }) => {
        const results = [...variants.data];

        // Keep the currently selected variant available when editing,
        // even if it does not match the current server-side search.
        const editingRelease = this.productReleases().find(
          (release) => release.id === this.editingId,
        );

        if (
          editingRelease &&
          !results.some(
            (variant) => variant.id === editingRelease.variant.id,
          )
        ) {
          results.unshift(editingRelease.variant);
        }

        this.variants.set(results);
        this.loadingReferences.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.referenceErrorMessage.set(
          this.readApiMessage(error, 'Could not load variants.'),
        );
        this.loadingReferences.set(false);
      },
    });
  }

  searchVariants(): void {
    this.loadReferences(this.variantSearchTerm.trim());
  }

  applySearch(): void {
    this.page.set(1);
    this.loadProductReleases();
  }

  goToPage(page: number): void {
    if (
      page < 1 ||
      page > this.totalPages() ||
      page === this.page()
    ) {
      return;
    }

    this.page.set(page);
    this.loadProductReleases();
  }

  startCreate(): void {
    if (this.loadingReferences() || this.referenceErrorMessage()) {
      return;
    }

    this.editingId = null;
    this.form = { ...EMPTY_FORM };
    this.formErrorMessage.set('');
    this.formVisible = true;
  }

  startEdit(productRelease: ProductReleaseAdminModel): void {
    if (this.loadingReferences() || this.referenceErrorMessage()) {
      return;
    }

    this.editingId = productRelease.id;

    // Ensure the existing variant remains available in the select.
    this.variants.update((current) => {
      if (
        current.some(
          (variant) => variant.id === productRelease.variant.id,
        )
      ) {
        return current;
      }

      return [productRelease.variant, ...current];
    });

    this.form = {
      name: productRelease.name,
      barcode: productRelease.barcode ?? '',
      releaseDate: productRelease.releaseDate
        ? productRelease.releaseDate.slice(0, 10)
        : '',
      packagingType: productRelease.packagingType ?? '',
      region: productRelease.region ?? '',
      language: productRelease.language ?? '',
      retailer: productRelease.retailer ?? '',
      notes: productRelease.notes ?? '',
      imageUrl: productRelease.imageUrl ?? '',
      variantId: productRelease.variant.id,
    };

    this.formErrorMessage.set('');
    this.formVisible = true;
  }

  cancelForm(): void {
    if (this.saving()) {
      return;
    }

    this.formVisible = false;
    this.editingId = null;
    this.form = { ...EMPTY_FORM };
    this.formErrorMessage.set('');
  }

  saveProductRelease(): void {
    const name = this.form.name.trim();
    const variantId = this.form.variantId;

    if (!name) {
      this.formErrorMessage.set('Name is required.');
      return;
    }

    if (!variantId) {
      this.formErrorMessage.set('Please select a variant.');
      return;
    }

    const payload: ProductReleaseAdminPayload = {
      name,
      barcode: this.form.barcode.trim() || null,
      releaseDate: this.form.releaseDate
        ? new Date(
            `${this.form.releaseDate}T00:00:00.000Z`,
          ).toISOString()
        : null,
      packagingType: this.form.packagingType.trim() || null,
      region: this.form.region.trim() || null,
      language: this.form.language.trim() || null,
      retailer: this.form.retailer.trim() || null,
      notes: this.form.notes.trim() || null,
      imageUrl: this.form.imageUrl.trim() || null,
      variantId,
    };

    this.saving.set(true);
    this.formErrorMessage.set('');

    const isCreating = this.editingId === null;

    const request = isCreating
      ? this.productReleaseAdminService.create(payload)
      : this.productReleaseAdminService.update(
          this.editingId!,
          payload,
        );

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.formVisible = false;
        this.editingId = null;
        this.form = { ...EMPTY_FORM };

        if (isCreating && this.page() !== 1) {
          this.page.set(1);
        }

        this.loadProductReleases();
      },
      error: (error: HttpErrorResponse) => {
        this.formErrorMessage.set(
          this.readApiMessage(
            error,
            'Could not save the product release.',
          ),
        );
        this.saving.set(false);
      },
    });
  }

  archiveProductRelease(productRelease: ProductReleaseAdminModel): void {
    if (this.deletingId()) {
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to archive "${productRelease.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    this.deletingId.set(productRelease.id);
    this.errorMessage.set('');

    this.productReleaseAdminService
      .remove(productRelease.id)
      .subscribe({
        next: () => {
          this.deletingId.set(null);

          if (
            this.productReleases().length === 1 &&
            this.page() > 1
          ) {
            this.page.set(this.page() - 1);
          }

          this.loadProductReleases();
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage.set(
            this.readApiMessage(
              error,
              'Could not archive the product release.',
            ),
          );
          this.deletingId.set(null);
        },
      });
  }

  formatVariantLabel(
    variant: ProductReleaseAdminReference,
  ): string {
    const figure = variant.figure;
    const variantName = variant.name?.trim() || 'Unnamed variant';

    return [
      variantName,
      figure.name,
      figure.character.name,
      figure.line.name,
      figure.line.manufacturer.name,
    ].join(' — ');
  }

  private readApiMessage(
    error: HttpErrorResponse,
    fallback: string,
  ): string {
    const message = error.error?.message;

    if (Array.isArray(message)) {
      return message.join(' ');
    }

    if (typeof message === 'string' && message.trim()) {
      return message;
    }

    return fallback;
  }
}