import { ApiProperty } from '@nestjs/swagger';

export class VariantDetailCharacterSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    nullable: true,
  })
  image!: string | null;
}

export class VariantDetailManufacturerSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class VariantDetailFranchiseSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class VariantDetailLineSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    nullable: true,
  })
  scale!: string | null;

  @ApiProperty({
    type: VariantDetailManufacturerSummaryDto,
  })
  manufacturer!: VariantDetailManufacturerSummaryDto;
}

export class VariantDetailFigureSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    nullable: true,
  })
  code!: string | null;

  @ApiProperty({
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    type: VariantDetailCharacterSummaryDto,
  })
  character!: VariantDetailCharacterSummaryDto;

  @ApiProperty({
    type: VariantDetailLineSummaryDto,
  })
  line!: VariantDetailLineSummaryDto;

  @ApiProperty({
    type: VariantDetailFranchiseSummaryDto,
  })
  franchise!: VariantDetailFranchiseSummaryDto;
}

export class VariantDetailProductReleaseSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    nullable: true,
  })
  packagingType!: string | null;

  @ApiProperty({
    nullable: true,
  })
  region!: string | null;

  @ApiProperty({
    nullable: true,
  })
  language!: string | null;

  @ApiProperty({
    nullable: true,
  })
  retailer!: string | null;

  @ApiProperty({
    nullable: true,
  })
  releaseDate!: string | null;

  @ApiProperty({
    nullable: true,
  })
  barcode!: string | null;

  @ApiProperty({
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    nullable: true,
  })
  notes!: string | null;
}

export class VariantDetailResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    nullable: true,
  })
  name!: string | null;

  @ApiProperty({
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    type: VariantDetailFigureSummaryDto,
  })
  figure!: VariantDetailFigureSummaryDto;

  @ApiProperty({
    type: [VariantDetailProductReleaseSummaryDto],
  })
  productReleases!: VariantDetailProductReleaseSummaryDto[];
}