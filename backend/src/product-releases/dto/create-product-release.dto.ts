import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateProductReleaseDto {
  @ApiProperty({
    example: 'VC13 - US Release',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'Blister Card',
  })
  @IsOptional()
  @IsString()
  packagingType?: string;

  @ApiPropertyOptional({
    example: 'United States',
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({
    example: 'English',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    example: 'Target',
  })
  @IsOptional()
  @IsString()
  retailer?: string;

  @ApiPropertyOptional({
    example: '2010-08-15',
  })
  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @ApiPropertyOptional({
    example: '653569123456',
  })
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiPropertyOptional({
    example: 'Wave 1 exclusive.',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    example: 'https://...',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    example: 'cmf9jb1ms0001efgh87654321',
  })
  @IsString()
  @IsNotEmpty()
  variantId!: string;
}