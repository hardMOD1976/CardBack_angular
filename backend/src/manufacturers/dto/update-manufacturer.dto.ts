import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateManufacturerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  foundedYear?: number;

  @IsOptional()
  @IsInt()
  dissolvedYear?: number;

  @IsOptional()
  @IsString()
  country?: string;
}