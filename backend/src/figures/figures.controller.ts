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

import { FiguresService } from './figures.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';

@ApiTags('Figures')
@Controller('figures')
export class FiguresController {
  constructor(private readonly figuresService: FiguresService) {}

  @ApiOperation({
    summary: 'Get all figures',
    description:
      'Returns all active figures ordered alphabetically.',
    operationId: 'findAllFigures',
  })
  @ApiOkResponse({
    description: 'Figures retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.figuresService.findAll();
  }

  @ApiOperation({
    summary: 'Get figure by id',
    description:
      'Returns an active figure by its identifier.',
    operationId: 'findFigureById',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Figure found.',
  })
  @ApiNotFoundResponse({
    description: 'Figure not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.figuresService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create figure',
    description:
      'Creates a new figure associated with an existing character and line.',
    operationId: 'createFigure',
  })
  @ApiCreatedResponse({
    description: 'Figure created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Character or Line not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate figure.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post()
  create(@Body() createFigureDto: CreateFigureDto) {
    return this.figuresService.create(createFigureDto);
  }

  @ApiOperation({
    summary: 'Update figure',
    description: 'Updates an existing figure.',
    operationId: 'updateFigure',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Figure updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Figure, Character or Line not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate figure.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFigureDto: UpdateFigureDto,
  ) {
    return this.figuresService.update(id, updateFigureDto);
  }

  @ApiOperation({
    summary: 'Soft delete figure',
    description:
      'Soft deletes a figure by setting its deletedAt timestamp.',
    operationId: 'deleteFigure',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Figure deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Figure not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.figuresService.remove(id);
  }
}