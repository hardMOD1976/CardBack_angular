import { IsIn, IsString, MaxLength } from 'class-validator';

export class IdentifyFigureDto {
  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  mimeType!: string;

  @IsString()
  @MaxLength(7_000_000)
  imageBase64!: string;
}
