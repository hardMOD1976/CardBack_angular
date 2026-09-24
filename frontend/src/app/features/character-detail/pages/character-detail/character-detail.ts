import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { CharacterDetailService } from '../../services/character-detail.service';
import { CharacterDetailModel } from '../../models/character-detail.model';

@Component({ selector: 'app-character-detail', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './character-detail.html', styleUrl: './character-detail.scss' })
export class CharacterDetail {
  private readonly route = inject(ActivatedRoute); private readonly destroyRef = inject(DestroyRef); private readonly service = inject(CharacterDetailService);
  readonly data = signal<CharacterDetailModel | null>(null); readonly loading = signal(true); readonly error = signal(false); readonly notFound = signal(false);
  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => {
      this.loading.set(true); this.error.set(false); this.notFound.set(false); this.data.set(null);
      const id = params.get('id'); if (!id) { this.notFound.set(true); this.loading.set(false); return of(null); }
      return this.service.getById(id).pipe(catchError((e) => { e.status === 404 ? this.notFound.set(true) : this.error.set(true); return of(null); }), finalize(() => this.loading.set(false)));
    }), takeUntilDestroyed(this.destroyRef)).subscribe((data) => this.data.set(data));
  }
}
