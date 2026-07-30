import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateFigureDto {
  @ApiProperty({
    example: 'Luke Skywalker',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'VC13',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    example: 'The Vintage Collection release.',
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
    example: 'cmf9ja8oq0000efgh12345678',
  })
  @IsString()
  @IsNotEmpty()
  characterId!: string;

  @ApiProperty({
    example: 'cmf9jb1ms0001efgh87654321',
  })
  @IsString()
  @IsNotEmpty()
  lineId!: string;
}