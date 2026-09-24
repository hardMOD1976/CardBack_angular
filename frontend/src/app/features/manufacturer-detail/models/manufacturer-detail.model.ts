export interface ManufacturerDetailModel {
  id: string; name: string; country: string | null; foundedYear: number | null; dissolvedYear: number | null;
  lines: { id: string; name: string; startYear: number | null; endYear: number | null; scale: string | null; logo: string | null; franchise: { id: string; name: string } }[];
}
