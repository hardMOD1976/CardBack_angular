import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLineDto {
  @ApiProperty({
    example: 'The Vintage Collection',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 2010,
  })
  @IsOptional()
  @IsInt()
  startYear?: number;

  @ApiPropertyOptional({
    example: 2028,
  })
  @IsOptional()
  @IsInt()
  endYear?: number;

  @ApiPropertyOptional({
    example: '3.75"',
  })
  @IsOptional()
  @IsString()
  scale?: string;

  @ApiPropertyOptional({
    example: 'https://...',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({
    example: 'Premium collector line.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'cmf9j8y4q0000abcd12345678',
  })
  @IsString()
  @IsNotEmpty()
  manufacturerId!: string;

  @ApiProperty({
    example: 'cmf9ja8oq0000efgh12345678',
  })
  @IsString()
  @IsNotEmpty()
  franchiseId!: string;
}