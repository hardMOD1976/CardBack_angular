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
  })
  @ApiResponse({
    status: 200,
    description: 'Variants retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.variantsService.findAll();
  }

  @ApiOperation({
    summary: 'Get variant by id',
    description: 'Returns a single variant.',
  })
  @ApiParam({
    name: 'id',
    description: 'Variant identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Variant found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Variant not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create variant',
    description:
      'Creates a new physical variant associated with an existing figure.',
  })
  @ApiResponse({
    status: 201,
    description: 'Variant created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 404,
    description: 'Figure not found.',
  })
  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantsService.create(createVariantDto);
  }

  @ApiOperation({
    summary: 'Update variant',
    description: 'Updates an existing variant.',
  })
  @ApiParam({
    name: 'id',
    description: 'Variant identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Variant updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Variant or Figure not found.',
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
      'Marks a variant as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Variant identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Variant deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Variant not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantsService.remove(id);
  }
}