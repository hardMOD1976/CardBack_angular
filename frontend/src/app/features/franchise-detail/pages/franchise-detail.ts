import {
Component,
DestroyRef,
inject,
signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
catchError,
finalize,
of,
switchMap,
} from 'rxjs';

import { FranchiseDetailService } from '../services/franchise-detail.service';
import { FranchiseDetailModel } from '../models/franchise-detail.model';

@Component({
selector: 'app-franchise-detail',
standalone: true,
imports: [
CommonModule,
RouterLink,
],
templateUrl: './franchise-detail.html',
styleUrl: './franchise-detail.scss',
})
export class FranchiseDetail {
private readonly route = inject(ActivatedRoute);

private readonly destroyRef = inject(DestroyRef);

private readonly franchiseDetailService =
inject(FranchiseDetailService);

readonly franchise =
signal<FranchiseDetailModel | null>(null);

readonly loading = signal(true);

readonly error = signal(false);

readonly notFound = signal(false);

ngOnInit(): void {
this.route.paramMap
.pipe(
switchMap((params) => {
const id = params.get('id');

      this.franchise.set(null);
      this.loading.set(true);
      this.error.set(false);
      this.notFound.set(false);

      if (!id) {
        this.loading.set(false);
        this.notFound.set(true);

        return of(null);
      }

      return this.franchiseDetailService
        .getById(id)
        .pipe(
          catchError((error: { status?: number }) => {
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
  .subscribe((franchise) => {
    this.franchise.set(franchise);
  });

}
}