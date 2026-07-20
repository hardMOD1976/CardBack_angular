import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFranchiseDto {
  @ApiProperty({
    example: 'Star Wars',
    description: 'Franchise name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'Lucasfilm',
    description: 'Current owner',
  })
  @IsOptional()
  @IsString()
  owner?: string;

  @ApiPropertyOptional({
    example: 1977,
    description: 'First appearance year',
  })
  @IsOptional()
  @IsInt()
  firstAppearance?: number;

  @ApiPropertyOptional({
    example: 'Science fiction franchise created by George Lucas.',
    description: 'Description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/starwars-logo.png',
    description: 'Logo URL',
  })
  @IsOptional()
  @IsString()
  logo?: string;
}