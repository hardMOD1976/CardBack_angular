export interface CharacterDetailModel {
  id: string; name: string; species: string | null; homeworld: string | null; affiliation: string | null;
  description: string | null; image: string | null;
  franchise: { id: string; name: string; owner: string | null; logo: string | null };
  figures: { id: string; name: string; code: string | null; imageUrl: string | null; variantsCount: number; line: { id: string; name: string; startYear: number | null; endYear: number | null } }[];
}
