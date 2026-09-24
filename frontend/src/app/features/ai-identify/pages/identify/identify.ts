import { Component, DestroyRef, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AiIdentifyService, FigureIdentificationMatch } from '../../services/ai-identify.service';

@Component({ selector: 'app-identify', standalone: true, imports: [CommonModule], templateUrl: './identify.html', styleUrl: './identify.scss' })
export class Identify implements OnDestroy {
  private readonly service = inject(AiIdentifyService); private readonly destroyRef = inject(DestroyRef);
  readonly file = signal<File | null>(null); readonly previewUrl = signal<string | null>(null); readonly matches = signal<FigureIdentificationMatch[]>([]);
  readonly disclaimer = signal(''); readonly loading = signal(false); readonly error = signal('');
  readonly maxImageBytes = 5 * 1024 * 1024;

  selectFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.error.set(''); this.matches.set([]); this.disclaimer.set('');
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { this.error.set('Choose a JPG, PNG or WebP image.'); return; }
    if (file.size > this.maxImageBytes) { this.error.set('Choose an image smaller than 5 MB.'); return; }
    const oldUrl = this.previewUrl(); if (oldUrl) URL.revokeObjectURL(oldUrl);
    this.file.set(file); this.previewUrl.set(URL.createObjectURL(file));
  }

  identify(): void {
    const file = this.file(); if (!file || this.loading()) return;
    this.loading.set(true); this.error.set('');
    const reader = new FileReader();
    reader.onerror = () => { this.loading.set(false); this.error.set('The image could not be read. Please choose it again.'); };
    reader.onload = () => {
      const dataUrl = String(reader.result || ''); const imageBase64 = dataUrl.split(',')[1];
      if (!imageBase64) { this.loading.set(false); this.error.set('The image could not be read. Please choose it again.'); return; }
      this.service.identify(imageBase64, file.type).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (result) => { this.matches.set(Array.isArray(result.matches) ? result.matches.slice(0, 5) : []); this.disclaimer.set(result.disclaimer || 'AI suggestions are not verified catalogue records.'); this.loading.set(false); },
        error: (failure: HttpErrorResponse) => { this.error.set(failure.error?.message || 'Could not identify the figure. Please try again.'); this.loading.set(false); },
      });
    };
    reader.readAsDataURL(file);
  }

  clear(): void {
    const url = this.previewUrl(); if (url) URL.revokeObjectURL(url);
    this.file.set(null); this.previewUrl.set(null); this.matches.set([]); this.error.set(''); this.disclaimer.set('');
  }

  ngOnDestroy(): void { const url = this.previewUrl(); if (url) URL.revokeObjectURL(url); }
}
