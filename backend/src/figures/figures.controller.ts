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
  })
  @ApiResponse({
    status: 200,
    description: 'Figures retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.figuresService.findAll();
  }

  @ApiOperation({
    summary: 'Get figure by id',
    description: 'Returns a single figure.',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Figure found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Figure not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.figuresService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create figure',
    description:
      'Creates a new figure associated with an existing character and line.',
  })
  @ApiResponse({
    status: 201,
    description: 'Figure created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 404,
    description: 'Character or Line not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate figure.',
  })
  @Post()
  create(@Body() createFigureDto: CreateFigureDto) {
    return this.figuresService.create(createFigureDto);
  }

  @ApiOperation({
    summary: 'Update figure',
    description: 'Updates an existing figure.',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Figure updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Figure, Character or Line not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate figure.',
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
      'Marks a figure as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Figure deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Figure not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.figuresService.remove(id);
  }
}