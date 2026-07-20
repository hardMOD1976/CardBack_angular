import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFranchiseDto {
  @ApiPropertyOptional({
    example: 'Star Wars',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Lucasfilm',
  })
  @IsOptional()
  @IsString()
  owner?: string;

  @ApiPropertyOptional({
    example: 1977,
  })
  @IsOptional()
  @IsInt()
  firstAppearance?: number;

  @ApiPropertyOptional({
    example: 'Science fiction franchise.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
  })
  @IsOptional()
  @IsString()
  logo?: string;
}