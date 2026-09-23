export interface LineSummaryModel {
  id: string;
  name: string;
  startYear: number | null;
  endYear: number | null;
  scale: string | null;
  logo: string | null;
}

export interface FranchiseDetailModel {
  id: string;
  name: string;
  owner: string | null;
  firstAppearance: number | null;
  description: string | null;
  logo: string | null;
  lines: LineSummaryModel[];
}