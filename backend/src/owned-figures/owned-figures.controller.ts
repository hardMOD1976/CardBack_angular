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

import { OwnedFiguresService } from './owned-figures.service';

import { CreateOwnedFigureDto } from './dto/create-owned-figure.dto';
import { UpdateOwnedFigureDto } from './dto/update-owned-figure.dto';

@ApiTags('Owned Figures')
@Controller('owned-figures')
export class OwnedFiguresController {
  constructor(
    private readonly ownedFiguresService: OwnedFiguresService,
  ) {}

  @ApiOperation({
    summary: 'Get all owned figures',
    description:
      'Returns all active owned figures.',
  })
  @ApiResponse({
    status: 200,
    description: 'Owned figures retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.ownedFiguresService.findAll();
  }

  @ApiOperation({
    summary: 'Get owned figure by id',
    description: 'Returns a single owned figure.',
  })
  @ApiParam({
    name: 'id',
    description: 'Owned Figure identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Owned figure found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Owned figure not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownedFiguresService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create owned figure',
    description:
      'Adds a figure to a collector collection.',
  })
  @ApiResponse({
    status: 201,
    description: 'Owned figure created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 404,
    description: 'Collector or Product Release not found.',
  })
  @Post()
  create(
    @Body()
    dto: CreateOwnedFigureDto,
  ) {
    return this.ownedFiguresService.create(dto);
  }

  @ApiOperation({
    summary: 'Update owned figure',
    description:
      'Updates collector-specific information for an owned figure.',
  })
  @ApiParam({
    name: 'id',
    description: 'Owned Figure identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Owned figure updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Owned figure not found.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    dto: UpdateOwnedFigureDto,
  ) {
    return this.ownedFiguresService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Soft delete owned figure',
    description:
      'Marks an owned figure as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Owned Figure identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Owned figure deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Owned figure not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownedFiguresService.remove(id);
  }
}