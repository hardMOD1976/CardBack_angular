import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiPropertyOptional({
    example: 'Long Saber',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Variant with long lightsaber and dark brown hair.',
  })
  @IsOptional()
  @IsString()
  description?: string;

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
  figureId!: string;
}