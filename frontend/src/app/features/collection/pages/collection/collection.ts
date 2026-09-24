import {
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  CollectionQuery,
  CollectionService,
} from '../../services/collection.service';

import { FigureCard } from '../../components/figure-card/figure-card';
import { FigureCardModel } from '../../models/figure-card.model';

import { CollectionHeader } from '../../components/cb-collection-header/cb-collection-header';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    CommonModule,
    FigureCard,
    CollectionHeader,
  ],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection implements OnInit {
  private readonly collectionService =
    inject(CollectionService);

  readonly figures =
    signal<FigureCardModel[]>([]);

  readonly loading =
    signal(true);

  readonly error =
    signal(false);

  readonly totalFigures =
    signal(0);

  readonly query =
    signal<CollectionQuery>({
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

  ngOnInit(): void {
    this.loadCollection();
  }

  private loadCollection(): void {
    this.loading.set(true);
    this.error.set(false);

    this.collectionService
      .getMyCollection(this.query())
      .subscribe({
        next: response => {
          const figures =
            response.data.map(
              (ownedFigure) => ({
                id:
                  ownedFigure.id,

                ownedFigureId:
                  ownedFigure.id,

                productReleaseId:
                  ownedFigure.productRelease.id,

                character:
                  ownedFigure
                    .productRelease
                    .variant
                    .figure
                    .character
                    .name,

                line:
                  ownedFigure
                    .productRelease
                    .variant
                    .figure
                    .line
                    .name,

                manufacturer:
                  ownedFigure
                    .productRelease
                    .variant
                    .figure
                    .line
                    .manufacturer
                    .name,

                imageUrl:
                  ownedFigure
                    .productRelease
                    .imageUrl,

                inCollection: true,

                showStatus: true,

                releaseName:
                  ownedFigure
                    .productRelease
                    .name,

                releaseYear:
                  ownedFigure
                    .productRelease
                    .releaseDate
                    ? new Date(
                        ownedFigure
                          .productRelease
                          .releaseDate,
                      ).getFullYear()
                    : null,

                packagingType:
                  ownedFigure
                    .productRelease
                    .packagingType,
              }),
            );

          this.figures.set(figures);

          this.totalFigures.set(
            response.meta.total,
          );

          this.loading.set(false);
        },

        error: error => {
          console.error(error);

          this.error.set(true);
          this.loading.set(false);
        },
      });
  }

  onSortChanged(
    sortBy: CollectionQuery['sortBy'],
    sortOrder: CollectionQuery['sortOrder'],
  ): void {
    this.query.update(current => ({
      ...current,
      page: 1,
      sortBy,
      sortOrder,
    }));

    this.loadCollection();
  }

  onFiltersChanged(
    condition: CollectionQuery['condition'],
    completeness: CollectionQuery['completeness'],
    packagingState: CollectionQuery['packagingState'],
  ): void {
    this.query.update(current => ({
      ...current,
      page: 1,
      condition,
      completeness,
      packagingState,
    }));

    this.loadCollection();
  }

  onFiltersClicked(): void {
    // Filters are handled by CollectionHeader.
  }

  removeOwnedFigure(id: string): void {
    this.collectionService.removeOwnedFigure(id).subscribe({
      next: () => {
        this.figures.update((current) => current.filter((figure) => figure.ownedFigureId !== id));
        this.totalFigures.update((total) => Math.max(0, total - 1));
      },
      error: () => this.error.set(true),
    });
  }
}
