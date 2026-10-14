import { ApiProperty } from '@nestjs/swagger';

export class ManufacturerDetailFranchiseSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class ManufacturerDetailLineSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ nullable: true })
  startYear!: number | null;

  @ApiProperty({ nullable: true })
  endYear!: number | null;

  @ApiProperty({ nullable: true })
  scale!: string | null;

  @ApiProperty({ nullable: true })
  logo!: string | null;

  @ApiProperty({
    type: ManufacturerDetailFranchiseSummaryDto,
  })
  franchise!: ManufacturerDetailFranchiseSummaryDto;
}

export class ManufacturerDetailResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ nullable: true })
  country!: string | null;

  @ApiProperty({ nullable: true })
  foundedYear!: number | null;

  @ApiProperty({ nullable: true })
  dissolvedYear!: number | null;

  @ApiProperty({
    type: [ManufacturerDetailLineSummaryDto],
  })
  lines!: ManufacturerDetailLineSummaryDto[];
}