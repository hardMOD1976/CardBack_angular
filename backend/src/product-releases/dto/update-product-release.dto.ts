import { PartialType } from '@nestjs/mapped-types';
import { CreateProductReleaseDto } from './create-product-release.dto';

export class UpdateProductReleaseDto extends PartialType(
  CreateProductReleaseDto,
) {}