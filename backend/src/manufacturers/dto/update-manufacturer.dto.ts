import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateManufacturerDto {
  @ApiPropertyOptional({
    example: 'Kenner',
    description: 'Manufacturer name.',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 1946,
    description: 'Year the company was founded.',
  })
  @IsOptional()
  @IsInt()
  foundedYear?: number;

  @ApiPropertyOptional({
    example: 2000,
    description: 'Year the company was dissolved.',
  })
  @IsOptional()
  @IsInt()
  dissolvedYear?: number;

  @ApiPropertyOptional({
    example: 'United States',
    description: 'Country where the manufacturer was based.',
  })
  @IsOptional()
  @IsString()
  country?: string;
}