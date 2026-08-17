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
              (ownedFigure: any) => ({
                id:
                  ownedFigure.id,

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

  onSortClicked(): void {
  // Temporary: sort panel will be implemented next.
}

onFiltersClicked(): void {
  // Temporary: filters panel will be implemented next.
}
}