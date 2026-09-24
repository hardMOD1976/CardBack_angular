import { ApiProperty } from '@nestjs/swagger';

class ManufacturerResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
}

class LineResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ type: ManufacturerResponseDto }) manufacturer!: ManufacturerResponseDto;
}

class CharacterResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) image!: string | null;
}

class FigureResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) code!: string | null;
  @ApiProperty({ nullable: true }) imageUrl!: string | null;
  @ApiProperty({ type: CharacterResponseDto }) character!: CharacterResponseDto;
  @ApiProperty({ type: LineResponseDto }) line!: LineResponseDto;
}

class VariantResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ nullable: true }) name!: string | null;
  @ApiProperty({ type: FigureResponseDto }) figure!: FigureResponseDto;
}

export class ProductReleaseResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) barcode!: string | null;
  @ApiProperty({ nullable: true }) releaseYear!: number | null;
  @ApiProperty({ nullable: true }) releaseDate!: string | null;
  @ApiProperty({ nullable: true }) packagingType!: string | null;
  @ApiProperty({ nullable: true }) region!: string | null;
  @ApiProperty({ nullable: true }) language!: string | null;
  @ApiProperty({ nullable: true }) retailer!: string | null;
  @ApiProperty({ nullable: true }) notes!: string | null;
  @ApiProperty({ nullable: true }) imageUrl!: string | null;
  @ApiProperty({ type: VariantResponseDto }) variant!: VariantResponseDto;
}
