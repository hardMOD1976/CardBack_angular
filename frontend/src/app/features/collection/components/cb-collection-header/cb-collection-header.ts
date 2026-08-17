import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type CollectionSortBy =
  | 'createdAt'
  | 'condition'
  | 'completeness'
  | 'packagingState'
  | 'purchaseDate'
  | 'purchasePrice'
  | 'estimatedMarketValue'
  | 'productReleaseName';

export type CollectionSortOrder =
  | 'asc'
  | 'desc';

@Component({
  selector: 'cb-collection-header',
  standalone: true,
  templateUrl: './cb-collection-header.html',
  styleUrl: './cb-collection-header.scss',
})
export class CollectionHeader {
  @Input({ required: true })
  totalFigures = 0;

  @Output()
  sortChanged =
    new EventEmitter<{
      sortBy: CollectionSortBy;
      sortOrder: CollectionSortOrder;
    }>();

  @Output()
  filtersClicked =
    new EventEmitter<void>();

  sortOpen = false;

  sortBy: CollectionSortBy =
    'createdAt';

  sortOrder: CollectionSortOrder =
    'desc';

  toggleSort(): void {
    this.sortOpen = !this.sortOpen;
  }

  applySort(): void {
    this.sortChanged.emit({
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    });

    this.sortOpen = false;
  }

  onSortByChange(
    value: string,
  ): void {
    this.sortBy =
      value as CollectionSortBy;
  }

  onSortOrderChange(
    value: string,
  ): void {
    this.sortOrder =
      value as CollectionSortOrder;
  }
}