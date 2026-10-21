import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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

import { Role } from '@prisma/client';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';

import { PaginationQueryDto } from '../common/pagination';

@Controller('lines')
@ApiTags('Lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @ApiOperation({
    summary: 'Get all lines',
    description: 'Returns all active lines ordered alphabetically.',
    operationId: 'findAllLines',
  })
  @ApiOkResponse({ description: 'Lines retrieved successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Get()
  @Public()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('search') search?: string,
  ) {
    const pagination: PaginationQueryDto = {
      page: Number(page),
      limit: Number(limit),
      search,
    };

    return this.linesService.findAll(pagination);
  }

  @ApiOperation({
    summary: 'Get line by id',
    description:
      'Returns an active figure line with its manufacturer, franchise and figures.',
    operationId: 'findLineById',
  })
  @ApiParam({ name: 'id', description: 'Line identifier.' })
  @ApiOkResponse({ description: 'Line found.' })
  @ApiNotFoundResponse({ description: 'Line not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linesService.findDetail(id);
  }

  @ApiOperation({
    summary: 'Create line',
    description:
      'Creates a new figure line associated with an active manufacturer and franchise.',
    operationId: 'createLine',
  })
  @ApiCreatedResponse({ description: 'Line created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation error.' })
  @ApiNotFoundResponse({ description: 'Manufacturer or Franchise not found.' })
  @ApiConflictResponse({ description: 'Duplicate line.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateLineDto) {
    return this.linesService.create(dto);
  }

  @ApiOperation({
    summary: 'Update line',
    description: 'Updates an existing active line.',
    operationId: 'updateLine',
  })
  @ApiParam({ name: 'id', description: 'Line identifier.' })
  @ApiOkResponse({ description: 'Line updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation error.' })
  @ApiNotFoundResponse({ description: 'Line, Manufacturer or Franchise not found.' })
  @ApiConflictResponse({ description: 'Duplicate line.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLineDto) {
    return this.linesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Soft delete line',
    description:
      'Soft deletes a line only when it has no active figures. Active figures must be archived or reassigned first.',
    operationId: 'deleteLine',
  })
  @ApiParam({ name: 'id', description: 'Line identifier.' })
  @ApiOkResponse({ description: 'Line deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Line not found.' })
  @ApiConflictResponse({
    description: 'Line cannot be deleted while it has active figures.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linesService.remove(id);
  }
}
