import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty({
    example: 'Kenner',
    description: 'Manufacturer name.',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

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