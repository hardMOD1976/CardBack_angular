
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Button as CbButton } from '../../../../shared/ui/button/button';
import { Input as CbInput } from '../../../../shared/ui/input/input';
import { FigureAdminService } from '../../services/figure-admin.service';

import {
  FigureAdminModel,
  FigureAdminPayload,
  FigureAdminReference,
} from '../../models/figure-admin.model';

interface FigureFormState {
  name: string;
  code: string;
  description: string;
  imageUrl: string;
  characterId: string;
  lineId: string;
}

const EMPTY_FORM: FigureFormState = {
  name: '',
  code: '',
  description: '',
  imageUrl: '',
  characterId: '',
  lineId: '',
};

@Component({
  selector: 'app-figures-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CbInput, CbButton],
  templateUrl: './figures-admin.html',
  styleUrl: './figures-admin.scss',
})
export class FiguresAdmin {
  private readonly figureAdminService = inject(FigureAdminService);

  readonly figures = signal<FigureAdminModel[]>([]);
  readonly characters = signal<FigureAdminReference[]>([]);
  readonly lines = signal<FigureAdminReference[]>([]);

  readonly loading = signal(false);
  readonly loadingReferences = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);

  readonly page = signal(1);
  readonly limit = 10;
  readonly total = signal(0);
  readonly totalPages = signal(0);

  readonly errorMessage = signal('');
  readonly referenceErrorMessage = signal('');
  readonly formErrorMessage = signal('');

  searchTerm = '';
  formVisible = false;
  editingId: string | null = null;
  form: FigureFormState = { ...EMPTY_FORM };

  constructor() {
    this.loadFigures();
    this.loadReferences();
  }

  loadFigures(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.figureAdminService
      .getAll(this.page(), this.limit, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.figures.set(response.data);
          this.total.set(response.total);
          this.totalPages.set(response.totalPages);
          this.page.set(response.page);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage.set(
            this.readApiMessage(error, 'Could not load figures.'),
          );
          this.loading.set(false);
        },
      });
  }

  loadReferences(): void {
    this.loadingReferences.set(true);
    this.referenceErrorMessage.set('');

    forkJoin({
      characters: this.figureAdminService.getCharacters(1, 100),
      lines: this.figureAdminService.getLines(1, 100),
    }).subscribe({
      next: ({ characters, lines }) => {
        this.characters.set(characters.data);
        this.lines.set(lines.data);
        this.loadingReferences.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.referenceErrorMessage.set(
          this.readApiMessage(
            error,
            'Could not load characters and lines.',
          ),
        );
        this.loadingReferences.set(false);
      },
    });
  }

  applySearch(): void {
    this.page.set(1);
    this.loadFigures();
  }

  goToPage(nextPage: number): void {
    if (
      nextPage < 1 ||
      nextPage > this.totalPages() ||
      nextPage === this.page()
    ) {
      return;
    }

    this.page.set(nextPage);
    this.loadFigures();
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

  startEdit(figure: FigureAdminModel): void {
    this.editingId = figure.id;
    this.form = {
      name: figure.name,
      code: figure.code ?? '',
      description: figure.description ?? '',
      imageUrl: figure.imageUrl ?? '',
      characterId: figure.character.id,
      lineId: figure.line.id,
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

  saveFigure(): void {
    if (this.saving()) {
      return;
    }

    const name = this.form.name.trim();

    if (!name || !this.form.characterId || !this.form.lineId) {
      this.formErrorMessage.set(
        'Name, character and line are required.',
      );
      return;
    }

    const payload: FigureAdminPayload = {
      name,
      code: this.normalizeOptionalValue(this.form.code),
      description: this.normalizeOptionalValue(this.form.description),
      imageUrl: this.normalizeOptionalValue(this.form.imageUrl),
      characterId: this.form.characterId,
      lineId: this.form.lineId,
    };

    this.saving.set(true);
    this.formErrorMessage.set('');

    const isCreating = this.editingId === null;

    const request = isCreating
      ? this.figureAdminService.create(payload)
      : this.figureAdminService.update(this.editingId!, payload);

    request.subscribe({
  next: () => {
    this.saving.set(false);
    this.formVisible = false;
    this.editingId = null;
    this.form = { ...EMPTY_FORM };

    if (isCreating && this.page() !== 1) {
      this.page.set(1);
    }

    this.loadFigures();
  },
  error: (error: HttpErrorResponse) => {
    this.formErrorMessage.set(
      this.readApiMessage(error, 'Could not save the figure.'),
    );
    this.saving.set(false);
  },
});
  }

  removeFigure(figure: FigureAdminModel): void {
    if (this.deletingId()) {
      return;
    }

    const confirmed = window.confirm(
      `Archive "${figure.name}"? Figures with active variants cannot be archived. Archive its active variants first.`,
    );

    if (!confirmed) {
      return;
    }

    this.deletingId.set(figure.id);
    this.errorMessage.set('');

    this.figureAdminService.remove(figure.id).subscribe({
      next: () => {
        this.deletingId.set(null);

        if (this.figures().length === 1 && this.page() > 1) {
          this.page.set(this.page() - 1);
        }

        this.loadFigures();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(
          this.readApiMessage(
            error,
            'Could not archive the figure.',
          ),
        );
        this.deletingId.set(null);
      },
    });
  }

  private normalizeOptionalValue(value: string): string | null {
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
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

    if (error.status === 409) {
      return 'This operation conflicts with existing catalog data.';
    }

    return fallback;
  }
}
