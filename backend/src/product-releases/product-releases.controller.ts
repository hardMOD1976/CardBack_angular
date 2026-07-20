import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductReleasesService } from './product-releases.service';

import { CreateProductReleaseDto } from './dto/create-product-release.dto';
import { UpdateProductReleaseDto } from './dto/update-product-release.dto';

@ApiTags('Product Releases')
@Controller('product-releases')
export class ProductReleasesController {
  constructor(
    private readonly productReleasesService: ProductReleasesService,
  ) {}

  @ApiOperation({
    summary: 'Get all product releases',
    description:
      'Returns all active product releases ordered alphabetically.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product releases retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.productReleasesService.findAll();
  }

  @ApiOperation({
    summary: 'Get product release by id',
    description: 'Returns a single product release.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product Release identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Product release found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product release not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productReleasesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create product release',
    description:
      'Creates a commercial release associated with an existing variant.',
  })
  @ApiResponse({
    status: 201,
    description: 'Product release created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 404,
    description: 'Variant not found.',
  })
  @Post()
  create(
    @Body()
    createDto: CreateProductReleaseDto,
  ) {
    return this.productReleasesService.create(createDto);
  }

  @ApiOperation({
    summary: 'Update product release',
    description: 'Updates an existing product release.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product Release identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Product release updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product release or Variant not found.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateDto: UpdateProductReleaseDto,
  ) {
    return this.productReleasesService.update(id, updateDto);
  }

  @ApiOperation({
    summary: 'Soft delete product release',
    description:
      'Marks a product release as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product Release identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Product release deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product release not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productReleasesService.remove(id);
  }
}