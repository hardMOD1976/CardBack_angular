export interface WishlistEntryModel {
  id: string; targetPrice: number | null; notes: string | null; createdAt: string;
  productRelease: {
    id: string; name: string; packagingType: string | null; region: string | null; releaseDate: string | null; barcode: string | null; imageUrl: string | null;
    variant: { id: string; name: string | null; figure: { id: string; name: string; imageUrl: string | null; character: { id: string; name: string }; line: { id: string; name: string; manufacturer: { id: string; name: string } } } };
  };
}
