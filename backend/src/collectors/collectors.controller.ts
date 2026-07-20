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
    operationId: 'findAllCollectors',
  })
  @ApiOkResponse({
    description: 'Collectors retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.collectorsService.findAll();
  }

  @ApiOperation({
    summary: 'Get collector by id',
    description:
      'Returns an active collector by its identifier.',
    operationId: 'findCollectorById',
  })
  @ApiParam({
    name: 'id',
    description: 'Collector identifier.',
  })
  @ApiOkResponse({
    description: 'Collector found.',
  })
  @ApiNotFoundResponse({
    description: 'Collector not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectorsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create collector',
    description: 'Creates a new collector account.',
    operationId: 'createCollector',
  })
  @ApiCreatedResponse({
    description: 'Collector created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Username or email already exists.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
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
    operationId: 'updateCollector',
  })
  @ApiParam({
    name: 'id',
    description: 'Collector identifier.',
  })
  @ApiOkResponse({
    description: 'Collector updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Collector not found.',
  })
  @ApiConflictResponse({
    description: 'Username or email already exists.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
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
      'Soft deletes a collector by setting its deletedAt timestamp.',
    operationId: 'deleteCollector',
  })
  @ApiParam({
    name: 'id',
    description: 'Collector identifier.',
  })
  @ApiOkResponse({
    description: 'Collector deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Collector not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectorsService.remove(id);
  }
}