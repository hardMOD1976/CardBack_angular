import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsInt,
  Min,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateOwnedFigureDto {
  @ApiProperty({
    example: 'cmf9jb1ms0001efgh87654321',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    example: 'cmf9jb1ms0002efgh87654321',
  })
  @IsString()
  @IsNotEmpty()
  productReleaseId!: string;

  @ApiProperty({
    example: 'Mint',
  })
  @IsString()
  @IsNotEmpty()
  condition!: string;

  @ApiProperty({
    example: 'Complete',
  })
  @IsString()
  @IsNotEmpty()
  completeness!: string;

  @ApiPropertyOptional({
    example: 'Sealed',
  })
  @IsOptional()
  @IsString()
  packagingState?: string;

  @ApiPropertyOptional({
    example: '2026-07-20',
  })
  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @ApiPropertyOptional({
    example: 39.95,
  })
  @IsOptional()
  @IsNumber()
  purchasePrice?: number;

  @ApiPropertyOptional({
    example: 'EUR',
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({
    example: 'eBay',
  })
  @IsOptional()
  @IsString()
  purchaseLocation?: string;

  @ApiPropertyOptional({
    example: 85.00,
  })
  @IsOptional()
  @IsNumber()
  estimatedMarketValue?: number;

  @ApiPropertyOptional({
    example: 'Display Cabinet A',
  })
  @IsOptional()
  @IsString()
  storageLocation?: string;

  @ApiPropertyOptional({
    example: 'Signed by the designer.',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
  example: 1,
  description: 'Number of identical copies owned.',
})
@IsOptional()
@IsInt()
@Min(1)
quantity?: number;

}