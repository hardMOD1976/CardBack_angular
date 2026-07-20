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
    operationId: 'findAllLines',
  })
  @ApiOkResponse({
    description: 'Lines retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.linesService.findAll();
  }

  @ApiOperation({
    summary: 'Get line by id',
    description:
      'Returns an active figure line by its identifier.',
    operationId: 'findLineById',
  })
  @ApiParam({
    name: 'id',
    description: 'Line identifier.',
  })
  @ApiOkResponse({
    description: 'Line found.',
  })
  @ApiNotFoundResponse({
    description: 'Line not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create line',
    description:
      'Creates a new figure line associated with an existing manufacturer and franchise.',
    operationId: 'createLine',
  })
  @ApiCreatedResponse({
    description: 'Line created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Manufacturer or Franchise not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate line.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post()
  create(@Body() dto: CreateLineDto) {
    return this.linesService.create(dto);
  }

  @ApiOperation({
    summary: 'Update line',
    description: 'Updates an existing line.',
    operationId: 'updateLine',
  })
  @ApiParam({
    name: 'id',
    description: 'Line identifier.',
  })
  @ApiOkResponse({
    description: 'Line updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Line, Manufacturer or Franchise not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate line.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
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
      'Soft deletes a line by setting its deletedAt timestamp.',
    operationId: 'deleteLine',
  })
  @ApiParam({
    name: 'id',
    description: 'Line identifier.',
  })
  @ApiOkResponse({
    description: 'Line deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Line not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linesService.remove(id);
  }
}