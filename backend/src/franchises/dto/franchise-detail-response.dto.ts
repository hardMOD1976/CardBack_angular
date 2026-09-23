import { LineSummaryDto } from '../../lines/dto/line-summary.dto';

export class FranchiseDetailResponseDto {
  id!: string;
  name!: string;
  owner!: string | null;
  firstAppearance!: number | null;
  description!: string | null;
  logo!: string | null;
  lines!: LineSummaryDto[];
}