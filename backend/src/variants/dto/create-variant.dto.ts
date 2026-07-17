import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVariantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  defaultImage?: string;

  @IsString()
  @IsNotEmpty()
  figureId!: string;
}