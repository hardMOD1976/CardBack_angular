import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin, finalize } from 'rxjs';

import { Button as CbButton } from '../../../../shared/ui/button/button';
import { Input as CbInput } from '../../../../shared/ui/input/input';
import {
  LineAdminModel,
  LineAdminPayload,
  LineAdminReference,
} from '../../models/line-admin.model';
import { LineAdminService } from '../../services/line-admin.service';

interface LineFormModel {
  name: string;
  startYear: string;
  endYear: string;
  scale: string;
  logo: string;
  description: string;
  manufacturerId: string;
  franchiseId: string;
}

@Component({
  selector: 'app-lines-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CbInput, CbButton],
  templateUrl: './lines-admin.html',
  styleUrl: './lines-admin.scss',
})
export class LinesAdmin {
  private readonly lineService = inject(LineAdminService);

  readonly lines = signal<LineAdminModel[]>([]);
  readonly manufacturers = signal<LineAdminReference[]>([]);
  readonly franchises = signal<LineAdminReference[]>([]);
  readonly loading = signal(false);
  readonly loadingReferences = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly page = signal(1);
  readonly total = signal(0);
  readonly totalPages = signal(0);
  readonly errorMessage = signal<string | null>(null);
  readonly referenceErrorMessage = signal<string | null>(null);

  readonly pageSize = 10;
  searchTerm = '';
  formVisible = false;
  editingId: string | null = null;
  formError: string | null = null;
  noticeMessage: string | null = null;
  form: LineFormModel = this.createEmptyForm();

  constructor() {
    this.loadLines();
    this.loadReferences();
  }

  loadLines(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.lineService
      .getAll(this.page(), this.pageSize, this.searchTerm.trim())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.lines.set(response.data);
          this.total.set(response.total);
          this.totalPages.set(response.totalPages);
        },
        error: (error: unknown) => {
          this.lines.set([]);
          this.total.set(0);
          this.totalPages.set(0);
          this.errorMessage.set(
            this.readApiMessage(error) ?? 'Unable to load lines.',
          );
        },
      });
  }

  loadReferences(): void {
    this.loadingReferences.set(true);
    this.referenceErrorMessage.set(null);

    forkJoin({
      manufacturers: this.lineService.getManufacturers(),
      franchises: this.lineService.getFranchises(),
    })
      .pipe(finalize(() => this.loadingReferences.set(false)))
      .subscribe({
        next: ({ manufacturers, franchises }) => {
          this.manufacturers.set(manufacturers.data);
          this.franchises.set(franchises.data);
        },
        error: (error: unknown) => {
          this.manufacturers.set([]);
          this.franchises.set([]);
          this.referenceErrorMessage.set(
            this.readApiMessage(error) ??
              'Unable to load manufacturer and franchise options.',
          );
        },
      });
  }

  applySearch(): void {
    this.page.set(1);
    this.noticeMessage = null;
    this.loadLines();
  }

  goToPage(nextPage: number): void {
    const lastPage = this.totalPages();

    if (nextPage < 1 || nextPage > lastPage || nextPage === this.page()) {
      return;
    }

    this.page.set(nextPage);
    this.loadLines();
  }

  startCreate(): void {
    this.form = this.createEmptyForm();
    this.editingId = null;
    this.formError = null;
    this.formVisible = true;
    this.noticeMessage = null;
  }

  startEdit(line: LineAdminModel): void {
    this.form = {
      name: line.name,
      startYear: line.startYear === null ? '' : String(line.startYear),
      endYear: line.endYear === null ? '' : String(line.endYear),
      scale: line.scale ?? '',
      logo: line.logo ?? '',
      description: line.description ?? '',
      manufacturerId: line.manufacturer.id,
      franchiseId: line.franchise.id,
    };
    this.editingId = line.id;
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

    if (!this.form.manufacturerId || !this.form.franchiseId) {
      this.formError = 'Select both a manufacturer and a franchise.';
      return;
    }

    const startYear = this.parseYear(this.form.startYear, 'Start year');
    if (startYear === null) return;

    const endYear = this.parseYear(this.form.endYear, 'End year');
    if (endYear === null) return;

    if (
      startYear !== undefined &&
      endYear !== undefined &&
      endYear < startYear
    ) {
      this.formError = 'End year cannot be earlier than start year.';
      return;
    }

    const id = this.editingId;
    const payload: LineAdminPayload = {
      name,
      manufacturerId: this.form.manufacturerId,
      franchiseId: this.form.franchiseId,
    };

    const scale = this.form.scale.trim();
    const logo = this.form.logo.trim();
    const description = this.form.description.trim();

    if (id) {
      // Null explicitly clears nullable fields when editing.
      payload.startYear = startYear ?? null;
      payload.endYear = endYear ?? null;
      payload.scale = scale || null;
      payload.logo = logo || null;
      payload.description = description || null;
    } else {
      if (startYear !== undefined) payload.startYear = startYear;
      if (endYear !== undefined) payload.endYear = endYear;
      if (scale) payload.scale = scale;
      if (logo) payload.logo = logo;
      if (description) payload.description = description;
    }

    const request = id
      ? this.lineService.update(id, payload)
      : this.lineService.create(payload);

    this.saving.set(true);
    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.noticeMessage = id
          ? 'Line updated successfully.'
          : 'Line created successfully.';
        this.errorMessage.set(null);
        this.cancelForm();

        if (!id) this.page.set(1);
        this.loadLines();
      },
      error: (error: unknown) => {
        this.formError =
          this.readApiMessage(error) ?? 'Unable to save line.';
      },
    });
  }

  removeLine(line: LineAdminModel): void {
    const confirmed = window.confirm(
      `Soft-delete ${line.name}? Lines with active figures cannot be deleted. Archive active figures first.`,
    );

    if (!confirmed) return;

    this.noticeMessage = null;
    this.errorMessage.set(null);
    this.deletingId.set(line.id);

    this.lineService
      .remove(line.id)
      .pipe(finalize(() => this.deletingId.set(null)))
      .subscribe({
        next: () => {
          this.noticeMessage = `${line.name} was deleted.`;

          if (this.lines().length === 1 && this.page() > 1) {
            this.page.update((currentPage) => currentPage - 1);
          }

          this.loadLines();
        },
        error: (error: unknown) => {
          this.errorMessage.set(
            this.readApiMessage(error) ?? 'Unable to delete line.',
          );
        },
      });
  }

  private createEmptyForm(): LineFormModel {
    return {
      name: '',
      startYear: '',
      endYear: '',
      scale: '',
      logo: '',
      description: '',
      manufacturerId: '',
      franchiseId: '',
    };
  }

  private parseYear(
    value: string,
    label: string,
  ): number | undefined | null {
    const trimmedValue = value.trim();
    if (!trimmedValue) return undefined;

    const year = Number(trimmedValue);
    if (Number.isInteger(year) && year > 0) return year;

    this.formError = `${label} must be a positive whole number.`;
    return null;
  }

  private readApiMessage(error: unknown): string | null {
    if (!(error instanceof HttpErrorResponse)) return null;

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
