import {
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GlobalSearchService } from '../../services/global-search.service';

import {
  GlobalSearchResult,
} from '../../models/global-search.model';

import {
  GlobalSearchResultCard,
} from '../../components/global-search-result-card/global-search-result-card';

@Component({
  selector: 'app-global-search',
  imports: [
    GlobalSearchResultCard,
  ],
  templateUrl: './global-search.html',
  styleUrl: './global-search.scss',
})
export class GlobalSearch {
  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly globalSearchService =
    inject(GlobalSearchService);

  readonly query = signal('');

  readonly results =
    signal<GlobalSearchResult[]>([]);

  readonly totalResults =
    signal(0);

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
          this.totalResults.set(0);
          return;
        }

        this.search(query);
      });
  }

  onResultSelected(
    result: GlobalSearchResult,
  ): void {
    const routes: Record<
      GlobalSearchResult['type'],
      string
    > = {
      franchise: 'franchises',
      manufacturer: 'manufacturers',
      line: 'lines',
      character: 'characters',
      figure: 'figures',
      variant: 'variants',
      productRelease: 'product-releases',
    };

    this.router.navigate([
      '/',
      routes[result.type],
      result.id,
    ]);
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
          this.totalResults.set(
            response.meta.total,
          );
          this.loading.set(false);
        },

        error: () => {
          this.results.set([]);
          this.totalResults.set(0);
          this.loading.set(false);
          this.error.set(true);
        },
      });
  }
}