import {
  ApiProperty,
} from '@nestjs/swagger';

export class FigureCharacterSummaryDto {
  @ApiProperty({
    example: 'cmf9ja8oq0000efgh12345678',
  })
  id!: string;

  @ApiProperty({
    example: 'Luke Skywalker',
  })
  name!: string;

  @ApiProperty({
    example: 'https://...',
    nullable: true,
  })
  image!: string | null;
}

export class FigureManufacturerSummaryDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
}

export class FigureFranchiseSummaryDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
}

export class FigureLineSummaryDto {
  @ApiProperty({
    example: 'cmf9jb1ms0001efgh87654321',
  })
  id!: string;

  @ApiProperty({
    example: 'The Vintage Collection',
  })
  name!: string;

  @ApiProperty({
    example: '3.75"',
    nullable: true,
  })
  scale!: string | null;

  @ApiProperty({
    example: 'https://...',
    nullable: true,
  })
  logo!: string | null;

  @ApiProperty({ type: FigureManufacturerSummaryDto })
  manufacturer!: FigureManufacturerSummaryDto;

  @ApiProperty({ type: FigureFranchiseSummaryDto })
  franchise!: FigureFranchiseSummaryDto;
}

export class FigureProductReleaseSummaryDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) packagingType!: string | null;
  @ApiProperty({ nullable: true }) region!: string | null;
  @ApiProperty({ nullable: true }) releaseDate!: string | null;
  @ApiProperty({ nullable: true }) barcode!: string | null;
  @ApiProperty({ nullable: true }) imageUrl!: string | null;
}

export class FigureVariantSummaryDto {
  @ApiProperty({
    example: 'cmf9jc2nt0002efgh11223344',
  })
  id!: string;

  @ApiProperty({
    example: 'Long Saber',
    nullable: true,
  })
  name!: string | null;

  @ApiProperty({
    example: 'Variant with extended lightsaber.',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    example: 'https://...',
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({ type: [FigureProductReleaseSummaryDto] })
  productReleases!: FigureProductReleaseSummaryDto[];
}

export class FigureDetailResponseDto {
  @ApiProperty({
    example: 'cmf9jd3ou0003efgh55667788',
  })
  id!: string;

  @ApiProperty({
    example: 'Luke Skywalker',
  })
  name!: string;

  @ApiProperty({
    example: 'VC13',
    nullable: true,
  })
  code!: string | null;

  @ApiProperty({
    example: 'The Vintage Collection release.',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    example: 'https://...',
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    type: FigureCharacterSummaryDto,
  })
  character!: FigureCharacterSummaryDto;

  @ApiProperty({
    type: FigureLineSummaryDto,
  })
  line!: FigureLineSummaryDto;

  @ApiProperty({
    type: [FigureVariantSummaryDto],
  })
  variants!: FigureVariantSummaryDto[];
}
