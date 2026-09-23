export interface ManufacturerSummaryModel {
  id: string;
  name: string;
}

export interface FranchiseSummaryModel {
  id: string;
  name: string;
  logo: string | null;
}

export interface FigureSummaryModel {
  id: string;
  name: string;
  code: string | null;
  imageUrl: string | null;
  characterId: string;
  characterName: string;
}

export interface LineDetailModel {
  id: string;
  name: string;
  startYear: number | null;
  endYear: number | null;
  scale: string | null;
  logo: string | null;
  description: string | null;
  manufacturer: ManufacturerSummaryModel;
  franchise: FranchiseSummaryModel;
  figures: FigureSummaryModel[];
}