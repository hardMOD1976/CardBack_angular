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
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@ApiTags('Variants')
@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @ApiOperation({
    summary: 'Get all variants',
    description:
      'Returns all active variants ordered alphabetically.',
    operationId: 'findAllVariants',
  })
  @ApiOkResponse({
    description: 'Variants retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.variantsService.findAll();
  }

  @ApiOperation({
    summary: 'Get variant by id',
    description:
      'Returns an active variant by its identifier.',
    operationId: 'findVariantById',
  })
  @ApiParam({
    name: 'id',
    description: 'Variant identifier.',
  })
  @ApiOkResponse({
    description: 'Variant found.',
  })
  @ApiNotFoundResponse({
    description: 'Variant not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create variant',
    description:
      'Creates a new physical variant associated with an existing figure.',
    operationId: 'createVariant',
  })
  @ApiCreatedResponse({
    description: 'Variant created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Figure not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate variant.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantsService.create(createVariantDto);
  }

  @ApiOperation({
    summary: 'Update variant',
    description: 'Updates an existing variant.',
    operationId: 'updateVariant',
  })
  @ApiParam({
    name: 'id',
    description: 'Variant identifier.',
  })
  @ApiOkResponse({
    description: 'Variant updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Variant or Figure not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate variant.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.variantsService.update(id, updateVariantDto);
  }

  @ApiOperation({
    summary: 'Soft delete variant',
    description:
      'Soft deletes a variant by setting its deletedAt timestamp.',
    operationId: 'deleteVariant',
  })
  @ApiParam({
    name: 'id',
    description: 'Variant identifier.',
  })
  @ApiOkResponse({
    description: 'Variant deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Variant not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantsService.remove(id);
  }
}