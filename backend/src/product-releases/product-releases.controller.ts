import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProductReleasesService } from './product-releases.service';

import { CreateProductReleaseDto } from './dto/create-product-release.dto';
import { UpdateProductReleaseDto } from './dto/update-product-release.dto';

@Controller('product-releases')
export class ProductReleasesController {
  constructor(
    private readonly productReleasesService: ProductReleasesService,
  ) {}

  @Get()
  findAll() {
    return this.productReleasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productReleasesService.findOne(id);
  }

  @Post()
  create(
    @Body()
    createDto: CreateProductReleaseDto,
  ) {
    return this.productReleasesService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateDto: UpdateProductReleaseDto,
  ) {
    return this.productReleasesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productReleasesService.remove(id);
  }
}