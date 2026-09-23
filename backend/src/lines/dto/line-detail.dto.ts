export class ManufacturerSummaryDto {
  id!: string;
  name!: string;
}

export class FranchiseSummaryDto {
  id!: string;
  name!: string;
  logo!: string | null;
}

export class FigureSummaryDto {
  id!: string;
  name!: string;
  code!: string | null;
  imageUrl!: string | null;
  characterId!: string;
  characterName!: string;
}

export class LineDetailResponseDto {
  id!: string;
  name!: string;
  startYear!: number | null;
  endYear!: number | null;
  scale!: string | null;
  logo!: string | null;
  description!: string | null;

  manufacturer!: ManufacturerSummaryDto;
  franchise!: FranchiseSummaryDto;

  figures!: FigureSummaryDto[];
}