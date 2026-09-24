export interface OwnedFigureResponseDto {
  id: string;
  productReleaseId: string;
  condition: string;
  completeness: string;
  packagingState: string | null;
  purchaseDate: string | null;
  purchasePrice: number | null;
  currency: string | null;
  purchaseLocation: string | null;
  estimatedMarketValue: number | null;
  storageLocation: string | null;
  notes: string | null;
  quantity: number;
  createdAt: string;
  productRelease: {
    id: string;
    name: string;
    packagingType: string | null;
    region: string | null;
    releaseDate: string | null;
    barcode: string | null;
    imageUrl: string | null;
    variant: {
      id: string;
      name: string | null;
      figure: {
        id: string;
        name: string;
        code: string | null;
        imageUrl: string | null;
        character: { id: string; name: string; image: string | null };
        line: { id: string; name: string; manufacturer: { id: string; name: string } };
      };
    };
  };
}
