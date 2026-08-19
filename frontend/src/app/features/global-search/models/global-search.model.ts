export type GlobalSearchResultType =
  | 'franchise'
  | 'manufacturer'
  | 'line'
  | 'character'
  | 'figure'
  | 'variant'
  | 'productRelease';

export interface GlobalSearchContext {
  franchise?: string;
  manufacturer?: string;
  line?: string;
  character?: string;
  figure?: string;
  variant?: string;
}

export interface GlobalSearchResult {
  id: string;
  type: GlobalSearchResultType;
  name: string;
  imageUrl: string | null;
  context: GlobalSearchContext;
}

export interface GlobalSearchResponse {
  data: GlobalSearchResult[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GlobalSearchQuery {
  q?: string;
  page?: number;
  limit?: number;
}