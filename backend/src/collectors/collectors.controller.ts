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

import { CollectorsService } from './collectors.service';

import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';

@ApiTags('Collectors')
@Controller('collectors')
export class CollectorsController {
  constructor(
    private readonly collectorsService: CollectorsService,
  ) {}

  @ApiOperation({
    summary: 'Get all collectors',
    description:
      'Returns all active collectors ordered alphabetically.',
  })
  @ApiResponse({
    status: 200,
    description: 'Collectors retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.collectorsService.findAll();
  }

  @ApiOperation({
    summary: 'Get collector by id',
    description: 'Returns a single collector.',
  })
  @ApiParam({
    name: 'id',
    description: 'Collector identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Collector found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Collector not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectorsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create collector',
    description:
      'Creates a new collector account.',
  })
  @ApiResponse({
    status: 201,
    description: 'Collector created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 409,
    description: 'Username or email already exists.',
  })
  @Post()
  create(
    @Body()
    createCollectorDto: CreateCollectorDto,
  ) {
    return this.collectorsService.create(
      createCollectorDto,
    );
  }

  @ApiOperation({
    summary: 'Update collector',
    description: 'Updates an existing collector.',
  })
  @ApiParam({
    name: 'id',
    description: 'Collector identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Collector updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Collector not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Username or email already exists.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateCollectorDto: UpdateCollectorDto,
  ) {
    return this.collectorsService.update(
      id,
      updateCollectorDto,
    );
  }

  @ApiOperation({
    summary: 'Soft delete collector',
    description:
      'Marks a collector as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Collector identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Collector deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Collector not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectorsService.remove(id);
  }
}