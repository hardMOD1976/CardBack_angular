export interface FigureDetailModel {
  id: string; name: string; code: string | null; description: string | null; imageUrl: string | null;
  character: { id: string; name: string; image: string | null };
  line: { id: string; name: string; scale: string | null; logo: string | null; manufacturer: { id: string; name: string }; franchise: { id: string; name: string } };
  variants: { id: string; name: string | null; description: string | null; imageUrl: string | null; productReleases: { id: string; name: string; packagingType: string | null; region: string | null; releaseDate: string | null; barcode: string | null; imageUrl: string | null }[] }[];
}
