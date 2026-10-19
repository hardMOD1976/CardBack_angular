import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { Button as CbButton } from '../../../../shared/ui/button/button';
import { Input as CbInput } from '../../../../shared/ui/input/input';
import {
  ManufacturerAdminModel,
  ManufacturerAdminPayload,
} from '../../models/manufacturer-admin.model';
import { ManufacturerAdminService } from '../../services/manufacturer-admin.service';

interface ManufacturerFormModel {
  name: string;
  country: string;
  foundedYear: string;
  dissolvedYear: string;
}

@Component({
  selector: 'app-manufacturers-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CbInput, CbButton],
  templateUrl: './manufacturers-admin.html',
  styleUrl: './manufacturers-admin.scss',
})
export class ManufacturersAdmin {
  private readonly manufacturerService = inject(ManufacturerAdminService);

  readonly manufacturers = signal<ManufacturerAdminModel[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly page = signal(1);
  readonly total = signal(0);
  readonly totalPages = signal(0);
  readonly errorMessage = signal<string | null>(null);

  readonly pageSize = 10;
  searchTerm = '';
  formVisible = false;
  editingId: string | null = null;
  formError: string | null = null;
  noticeMessage: string | null = null;
  form: ManufacturerFormModel = this.createEmptyForm();

  constructor() {
    this.loadManufacturers();
  }

  loadManufacturers(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.manufacturerService
      .getAll(this.page(), this.pageSize, this.searchTerm.trim())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.manufacturers.set(response.data);
          this.total.set(response.total);
          this.totalPages.set(response.totalPages);
        },
        error: (error: unknown) => {
          this.manufacturers.set([]);
          this.total.set(0);
          this.totalPages.set(0);
          this.errorMessage.set(
            this.readApiMessage(error) ?? 'Unable to load manufacturers.',
          );
        },
      });
  }

  applySearch(): void {
    this.page.set(1);
    this.noticeMessage = null;
    this.loadManufacturers();
  }

  goToPage(nextPage: number): void {
    const lastPage = this.totalPages();

    if (nextPage < 1 || nextPage > lastPage || nextPage === this.page()) {
      return;
    }

    this.page.set(nextPage);
    this.loadManufacturers();
  }

  startCreate(): void {
    this.form = this.createEmptyForm();
    this.editingId = null;
    this.formError = null;
    this.formVisible = true;
    this.noticeMessage = null;
  }

  startEdit(manufacturer: ManufacturerAdminModel): void {
    this.form = {
      name: manufacturer.name,
      country: manufacturer.country ?? '',
      foundedYear:
        manufacturer.foundedYear === null
          ? ''
          : String(manufacturer.foundedYear),
      dissolvedYear:
        manufacturer.dissolvedYear === null
          ? ''
          : String(manufacturer.dissolvedYear),
    };
    this.editingId = manufacturer.id;
    this.formError = null;
    this.formVisible = true;
    this.noticeMessage = null;
  }

  cancelForm(): void {
    this.formVisible = false;
    this.formError = null;
    this.editingId = null;
    this.form = this.createEmptyForm();
  }

  save(): void {
    this.formError = null;

    const name = this.form.name.trim();
    if (!name) {
      this.formError = 'Name is required.';
      return;
    }

    const foundedYear = this.parseYear(this.form.foundedYear);
    if (foundedYear === null) {
      this.formError = 'Founded year must be a positive whole number.';
      return;
    }

    const dissolvedYear = this.parseYear(this.form.dissolvedYear);
    if (dissolvedYear === null) {
      this.formError = 'Dissolved year must be a positive whole number.';
      return;
    }

    if (
      foundedYear !== undefined &&
      dissolvedYear !== undefined &&
      dissolvedYear < foundedYear
    ) {
      this.formError = 'Dissolved year cannot be earlier than founded year.';
      return;
    }

    const id = this.editingId;
    const payload: ManufacturerAdminPayload = { name };
    const country = this.form.country.trim();

    if (id) {
      // Null clears optional values when editing an existing manufacturer.
      payload.country = country || null;
      payload.foundedYear = foundedYear ?? null;
      payload.dissolvedYear = dissolvedYear ?? null;
    } else {
      if (country) {
        payload.country = country;
      }
      if (foundedYear !== undefined) {
        payload.foundedYear = foundedYear;
      }
      if (dissolvedYear !== undefined) {
        payload.dissolvedYear = dissolvedYear;
      }
    }

    const request = id
      ? this.manufacturerService.update(id, payload)
      : this.manufacturerService.create(payload);

    this.saving.set(true);
    request
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.noticeMessage = id
            ? 'Manufacturer updated successfully.'
            : 'Manufacturer created successfully.';
          this.errorMessage.set(null);
          this.cancelForm();

          if (!id) {
            this.page.set(1);
          }

          this.loadManufacturers();
        },
        error: (error: unknown) => {
          this.formError =
            this.readApiMessage(error) ?? 'Unable to save manufacturer.';
        },
      });
  }

  removeManufacturer(manufacturer: ManufacturerAdminModel): void {
    const confirmed = window.confirm(
      `Soft-delete ${manufacturer.name}? Manufacturers with active lines cannot be deleted.`,
    );

    if (!confirmed) {
      return;
    }

    this.noticeMessage = null;
    this.errorMessage.set(null);
    this.deletingId.set(manufacturer.id);

    this.manufacturerService
      .remove(manufacturer.id)
      .pipe(finalize(() => this.deletingId.set(null)))
      .subscribe({
        next: () => {
          this.noticeMessage = `${manufacturer.name} was deleted.`;

          if (this.manufacturers().length === 1 && this.page() > 1) {
            this.page.update((currentPage) => currentPage - 1);
          }

          this.loadManufacturers();
        },
        error: (error: unknown) => {
          this.errorMessage.set(
            this.readApiMessage(error) ?? 'Unable to delete manufacturer.',
          );
        },
      });
  }

  private createEmptyForm(): ManufacturerFormModel {
    return {
      name: '',
      country: '',
      foundedYear: '',
      dissolvedYear: '',
    };
  }

  private parseYear(value: string): number | undefined | null {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return undefined;
    }

    const year = Number(trimmedValue);
    return Number.isInteger(year) && year > 0 ? year : null;
  }

  private readApiMessage(error: unknown): string | null {
    if (!(error instanceof HttpErrorResponse)) {
      return null;
    }

    const message = (error.error as { message?: unknown } | null)?.message;

    if (Array.isArray(message)) {
      const messages = message.filter(
        (item): item is string => typeof item === 'string',
      );
      return messages.length ? messages.join(' ') : null;
    }

    return typeof message === 'string' && message.trim()
      ? message
      : null;
  }
}
