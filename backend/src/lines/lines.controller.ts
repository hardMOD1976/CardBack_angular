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

import { LinesService } from './lines.service';
import { CreateLineDto } from './dto/create-lines.dto';
import { UpdateLineDto } from './dto/update-lines.dto';

@ApiTags('Lines')
@Controller('lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @ApiOperation({
    summary: 'Get all lines',
    description:
      'Returns all active figure lines ordered alphabetically, including their manufacturer and franchise.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lines retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.linesService.findAll();
  }

  @ApiOperation({
    summary: 'Get line by id',
    description: 'Returns a single line.',
  })
  @ApiParam({
    name: 'id',
    description: 'Line identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Line found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Line not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create line',
    description:
      'Creates a new figure line associated with an existing manufacturer and franchise.',
  })
  @ApiResponse({
    status: 201,
    description: 'Line created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 404,
    description: 'Manufacturer or Franchise not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate line.',
  })
  @Post()
  create(@Body() dto: CreateLineDto) {
    return this.linesService.create(dto);
  }

  @ApiOperation({
    summary: 'Update line',
    description: 'Updates an existing line.',
  })
  @ApiParam({
    name: 'id',
    description: 'Line identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Line updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Line, Manufacturer or Franchise not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate line.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLineDto,
  ) {
    return this.linesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Soft delete line',
    description:
      'Marks a line as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Line identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Line deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Line not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linesService.remove(id);
  }
}