export interface VariantDetailModel {
  id: string; name: string | null; description: string | null; imageUrl: string | null;
  figure: {
    id: string; name: string; code: string | null; imageUrl: string | null;
    character: { id: string; name: string; image: string | null };
    line: { id: string; name: string; scale: string | null; manufacturer: { id: string; name: string } };
    franchise: { id: string; name: string };
  };
  productReleases: { id: string; name: string; packagingType: string | null; region: string | null; language: string | null; retailer: string | null; releaseDate: string | null; barcode: string | null; imageUrl: string | null; notes: string | null }[];
}
