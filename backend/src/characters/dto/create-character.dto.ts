import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty({
    example: 'Luke Skywalker',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'Human',
  })
  @IsOptional()
  @IsString()
  species?: string;

  @ApiPropertyOptional({
    example: 'Tatooine',
  })
  @IsOptional()
  @IsString()
  homeworld?: string;

  @ApiPropertyOptional({
    example: 'Jedi Order',
  })
  @IsOptional()
  @IsString()
  affiliation?: string;

  @ApiPropertyOptional({
    example: 'Jedi Knight and hero of the Rebel Alliance.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://...',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    example: 'cmf9ja8oq0000efgh12345678',
  })
  @IsString()
  @IsNotEmpty()
  franchiseId!: string;
}