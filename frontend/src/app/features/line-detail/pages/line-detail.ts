import {
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
} from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

import {
  catchError,
  finalize,
  of,
  switchMap,
} from 'rxjs';

import {
  LineDetailService,
} from '../services/line-detail.service';

import {
  LineDetailModel,
} from '../models/line-detail.model';

@Component({
  selector: 'app-line-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './line-detail.html',
  styleUrl: './line-detail.scss',
})
export class LineDetail {
  private readonly route = inject(ActivatedRoute);

  private readonly destroyRef = inject(DestroyRef);

  private readonly lineDetailService =
    inject(LineDetailService);

  readonly line = signal<LineDetailModel | null>(null);

  readonly loading = signal(true);

  readonly error = signal(false);

  readonly notFound = signal(false);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          this.line.set(null);
          this.loading.set(true);
          this.error.set(false);
          this.notFound.set(false);

          if (!id) {
            this.loading.set(false);
            this.notFound.set(true);

            return of(null);
          }

          return this.lineDetailService
            .getById(id)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                  this.notFound.set(true);
                } else {
                  this.error.set(true);
                }

                return of(null);
              }),
              finalize(() => {
                this.loading.set(false);
              }),
            );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((line) => {
        this.line.set(line);
      });
  }
}