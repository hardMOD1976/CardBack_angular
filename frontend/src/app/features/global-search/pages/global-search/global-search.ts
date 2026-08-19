import {
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GlobalSearchService } from '../../services/global-search.service';

import {
  GlobalSearchResult,
} from '../../models/global-search.model';

@Component({
  selector: 'app-global-search',
  imports: [],
  templateUrl: './global-search.html',
  styleUrl: './global-search.scss',
})
export class GlobalSearch {
  private readonly route =
    inject(ActivatedRoute);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly globalSearchService =
    inject(GlobalSearchService);

  readonly query = signal('');

  readonly results =
    signal<GlobalSearchResult[]>([]);

  readonly loading =
    signal(false);

  readonly error =
    signal(false);

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((params) => {
        const query =
          params.get('q')?.trim() ?? '';

        this.query.set(query);

        if (!query) {
          this.results.set([]);
          return;
        }

        this.search(query);
      });
  }

  private search(query: string): void {
    this.loading.set(true);
    this.error.set(false);

    this.globalSearchService
      .search({
        q: query,
        page: 1,
        limit: 20,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          this.results.set(response.data);
          this.loading.set(false);
        },

        error: () => {
          this.results.set([]);
          this.loading.set(false);
          this.error.set(true);
        },
      });
  }
}