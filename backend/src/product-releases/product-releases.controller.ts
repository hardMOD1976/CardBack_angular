import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ProductReleasesService } from './product-releases.service';

import { CreateProductReleaseDto } from './dto/create-product-release.dto';
import { UpdateProductReleaseDto } from './dto/update-product-release.dto';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

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
    operationId: 'findAllProductReleases',
  })
  @ApiOkResponse({
    description: 'Product releases retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.productReleasesService.findAll();
  }

  @ApiOperation({
    summary: 'Get product release by id',
    description:
      'Returns an active product release by its identifier.',
    operationId: 'findProductReleaseById',
  })
  @ApiParam({
    name: 'id',
    description: 'Product Release identifier.',
  })
  @ApiOkResponse({
    description: 'Product release found.',
  })
  @ApiNotFoundResponse({
    description: 'Product release not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productReleasesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create product release',
    description:
      'Creates a commercial release associated with an existing variant.',
    operationId: 'createProductRelease',
  })
  @ApiCreatedResponse({
    description: 'Product release created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Variant not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate product release.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
   @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
    operationId: 'updateProductRelease',
  })
  @ApiParam({
    name: 'id',
    description: 'Product Release identifier.',
  })
  @ApiOkResponse({
    description: 'Product release updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Product release or Variant not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate product release.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
   @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
      'Soft deletes a product release by setting its deletedAt timestamp.',
    operationId: 'deleteProductRelease',
  })
  @ApiParam({
    name: 'id',
    description: 'Product Release identifier.',
  })
  @ApiOkResponse({
    description: 'Product release deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Product release not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
   @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productReleasesService.remove(id);
  }
}