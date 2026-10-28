
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Input as CbInput } from '../../../../shared/ui/input/input';

import {
  VariantAdminModel,
  VariantAdminPayload,
  VariantAdminReference,
} from '../../models/variant-admin.model';

import { VariantAdminService } from '../../services/variant-admin.service';

interface VariantFormState {
  name: string;
  description: string;
  imageUrl: string;
  figureId: string;
}

const EMPTY_FORM: VariantFormState = {
  name: '',
  description: '',
  imageUrl: '',
  figureId: '',
};

@Component({
  selector: 'app-variants-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CbInput],
  templateUrl: './variant-admin.html',
  styleUrl: './variant-admin.scss',
})
export class VariantsAdmin {
  private readonly variantAdminService = inject(VariantAdminService);

  readonly variants = signal<VariantAdminModel[]>([]);
  readonly figures = signal<VariantAdminReference[]>([]);

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
  formVisible = false;
  editingId: string | null = null;
  form: VariantFormState = { ...EMPTY_FORM };

  constructor() {
    this.loadVariants();
    this.loadReferences();
  }

  loadVariants(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.variantAdminService
      .getAll(this.page(), this.limit(), this.searchTerm)
      .subscribe({
        next: (response) => {
          this.variants.set(response.data);
          this.page.set(response.page);
          this.limit.set(response.limit);
          this.total.set(response.total);
          this.totalPages.set(response.totalPages);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage.set(
            this.readApiMessage(error, 'Could not load variants.'),
          );
          this.loading.set(false);
        },
      });
  }

  loadReferences(): void {
    this.loadingReferences.set(true);
    this.referenceErrorMessage.set('');

    forkJoin({
      figures: this.variantAdminService.getFigures(1, 100),
    }).subscribe({
      next: ({ figures }) => {
        this.figures.set(figures.data);
        this.loadingReferences.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.referenceErrorMessage.set(
          this.readApiMessage(error, 'Could not load figures.'),
        );
        this.loadingReferences.set(false);
      },
    });
  }

  applySearch(): void {
    this.page.set(1);
    this.loadVariants();
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
    this.loadVariants();
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

  startEdit(variant: VariantAdminModel): void {
    if (this.loadingReferences() || this.referenceErrorMessage()) {
      return;
    }

    this.editingId = variant.id;
    this.form = {
      name: variant.name ?? '',
      description: variant.description ?? '',
      imageUrl: variant.imageUrl ?? '',
      figureId: variant.figure.id,
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

  saveVariant(): void {
    const name = this.form.name.trim();
    const figureId = this.form.figureId;

    if (!figureId) {
      this.formErrorMessage.set('Please select a figure.');
      return;
    }

    const payload: VariantAdminPayload = {
      name: name || null,
      description: this.form.description.trim() || null,
      imageUrl: this.form.imageUrl.trim() || null,
      figureId,
    };

    this.saving.set(true);
    this.formErrorMessage.set('');

    const isCreating = this.editingId === null;
    const request = isCreating
      ? this.variantAdminService.create(payload)
      : this.variantAdminService.update(this.editingId!, payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.formVisible = false;
        this.editingId = null;
        this.form = { ...EMPTY_FORM };

        if (isCreating && this.page() !== 1) {
          this.page.set(1);
        }

        this.loadVariants();
      },
      error: (error: HttpErrorResponse) => {
        this.formErrorMessage.set(
          this.readApiMessage(error, 'Could not save the variant.'),
        );
        this.saving.set(false);
      },
    });
  }

  archiveVariant(variant: VariantAdminModel): void {
    if (this.deletingId()) {
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to archive "${variant.name || 'Unnamed variant'}"?`,
    );

    if (!confirmed) {
      return;
    }

    this.deletingId.set(variant.id);
    this.errorMessage.set('');

    this.variantAdminService.remove(variant.id).subscribe({
      next: () => {
        this.deletingId.set(null);

        if (this.variants().length === 1 && this.page() > 1) {
          this.page.set(this.page() - 1);
        }

        this.loadVariants();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(
          this.readApiMessage(error, 'Could not archive the variant.'),
        );
        this.deletingId.set(null);
      },
    });
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
