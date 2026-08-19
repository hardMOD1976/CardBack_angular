import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

import {
  GlobalSearchResult,
  GlobalSearchResultType,
} from '../../models/global-search.model';

@Component({
  selector: 'cb-global-search-result-card',
  imports: [],
  templateUrl: './global-search-result-card.html',
  styleUrl: './global-search-result-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalSearchResultCard {
  readonly result =
    input.required<GlobalSearchResult>();

  get typeLabel(): string {
    return this.formatType(
      this.result().type,
    );
  }

  get contextItems(): string[] {
    const context =
      this.result().context;

    return [
      context.franchise,
      context.manufacturer,
      context.line,
      context.character,
      context.figure,
      context.variant,
    ].filter(
      (value): value is string =>
        Boolean(value),
    );
  }

  private formatType(
    type: GlobalSearchResultType,
  ): string {
    switch (type) {
      case 'productRelease':
        return 'Product Release';

      default:
        return type.charAt(0).toUpperCase() +
          type.slice(1);
    }
  }
}