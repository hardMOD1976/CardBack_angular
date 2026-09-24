import { IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateWishlistEntryDto {
  @IsString()
  productReleaseId!: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100000000)
  targetPrice?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
