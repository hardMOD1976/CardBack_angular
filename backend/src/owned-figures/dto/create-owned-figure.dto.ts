import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOwnedFigureDto {
  @IsString()
  @IsNotEmpty()
  collectorId!: string;

  @IsString()
  @IsNotEmpty()
  productReleaseId!: string;

  @IsString()
  @IsNotEmpty()
  condition!: string;

  @IsString()
  @IsNotEmpty()
  completeness!: string;

  @IsOptional()
  @IsString()
  packagingState?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @IsOptional()
  @IsNumber()
  purchasePrice?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  purchaseLocation?: string;

  @IsOptional()
  @IsNumber()
  estimatedMarketValue?: number;

  @IsOptional()
  @IsString()
  storageLocation?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}