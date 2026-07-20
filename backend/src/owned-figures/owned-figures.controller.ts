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
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
    description: 'Returns all active owned figures.',
    operationId: 'findAllOwnedFigures',
  })
  @ApiOkResponse({
    description: 'Owned figures retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.ownedFiguresService.findAll();
  }

  @ApiOperation({
    summary: 'Get owned figure by id',
    description: 'Returns an active owned figure by its identifier.',
    operationId: 'findOwnedFigureById',
  })
  @ApiParam({
    name: 'id',
    description: 'Owned Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Owned figure found.',
  })
  @ApiNotFoundResponse({
    description: 'Owned figure not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownedFiguresService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create owned figure',
    description:
      'Adds a product release to a collector collection.',
    operationId: 'createOwnedFigure',
  })
  @ApiCreatedResponse({
    description: 'Owned figure created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Collector or Product Release not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
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
    operationId: 'updateOwnedFigure',
  })
  @ApiParam({
    name: 'id',
    description: 'Owned Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Owned figure updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Owned figure not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
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
      'Soft deletes an owned figure by setting its deletedAt timestamp.',
    operationId: 'deleteOwnedFigure',
  })
  @ApiParam({
    name: 'id',
    description: 'Owned Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Owned figure deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Owned figure not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownedFiguresService.remove(id);
  }
}