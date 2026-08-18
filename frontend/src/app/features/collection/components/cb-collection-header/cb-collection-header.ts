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
  filtersChanged =
    new EventEmitter<{
      condition?: string;
      completeness?: string;
      packagingState?: string;
    }>();

  sortOpen = false;

  filtersOpen = false;

  sortBy: CollectionSortBy =
    'createdAt';

  sortOrder: CollectionSortOrder =
    'desc';

  condition?: string;

  completeness?: string;

  packagingState?: string;

  toggleSort(): void {
    this.sortOpen = !this.sortOpen;

    if (this.sortOpen) {
      this.filtersOpen = false;
    }
  }

  toggleFilters(): void {
    this.filtersOpen = !this.filtersOpen;

    if (this.filtersOpen) {
      this.sortOpen = false;
    }
  }

  applySort(): void {
    this.sortChanged.emit({
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    });

    this.sortOpen = false;
  }

  applyFilters(): void {
    this.filtersChanged.emit({
      condition: this.condition,
      completeness: this.completeness,
      packagingState: this.packagingState,
    });

    this.filtersOpen = false;
  }

  clearFilters(): void {
    this.condition = undefined;
    this.completeness = undefined;
    this.packagingState = undefined;

    this.filtersChanged.emit({
      condition: undefined,
      completeness: undefined,
      packagingState: undefined,
    });

    this.filtersOpen = false;
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

  onConditionChange(
    value: string,
  ): void {
    this.condition =
      value || undefined;
  }

  onCompletenessChange(
    value: string,
  ): void {
    this.completeness =
      value || undefined;
  }

  onPackagingStateChange(
    value: string,
  ): void {
    this.packagingState =
      value || undefined;
  }
}