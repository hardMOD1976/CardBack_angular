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
    description: 'Manufacturer name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 1946,
    description: 'Year the manufacturer was founded',
  })
  @IsOptional()
  @IsInt()
  foundedYear?: number;

  @ApiPropertyOptional({
    example: 2000,
    description: 'Year the manufacturer was dissolved',
  })
  @IsOptional()
  @IsInt()
  dissolvedYear?: number;

  @ApiPropertyOptional({
    example: 'United States',
    description: 'Country of origin',
  })
  @IsOptional()
  @IsString()
  country?: string;
}