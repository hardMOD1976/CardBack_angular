import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFigureDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  defaultImage?: string;

  @IsString()
  @IsNotEmpty()
  characterId!: string;

  @IsString()
  @IsNotEmpty()
  lineId!: string;
}