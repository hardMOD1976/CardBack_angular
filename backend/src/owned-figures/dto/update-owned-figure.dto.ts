import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnedFigureDto } from './create-owned-figure.dto';

export class UpdateOwnedFigureDto extends PartialType(
  CreateOwnedFigureDto,
) {}