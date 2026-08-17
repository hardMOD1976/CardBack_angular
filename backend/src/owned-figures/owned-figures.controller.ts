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

import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from '../common/pagination';
import { OwnedFiguresQueryDto } from './dto/owned-figures-query.dto';

@ApiTags('Owned Figures')
@Controller('owned-figures')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class OwnedFiguresController {
  constructor(
    private readonly ownedFiguresService: OwnedFiguresService,
  ) {}

  @ApiOperation({
    summary: 'Get authenticated user owned figures',
    description:
      'Returns the authenticated user collection.',
    operationId: 'findAllOwnedFigures',
  })
  @ApiOkResponse({
    description: 'Owned figures retrieved successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll(
    @CurrentUserId() userId: string,
    @Query() pagination: OwnedFiguresQueryDto,
  ) {
    return this.ownedFiguresService.findAll(
      userId,
      pagination,
    );
  }

  @ApiOperation({
    summary: 'Get owned figure by id',
    description:
      'Returns one owned figure belonging to the authenticated user.',
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
  findOne(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.ownedFiguresService.findOne(
      userId,
      id,
    );
  }

  @ApiOperation({
    summary: 'Create owned figure',
    description:
      'Adds a product release to the authenticated user collection.',
    operationId: 'createOwnedFigure',
  })
  @ApiCreatedResponse({
    description: 'Owned figure created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Product Release not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post()
  create(
    @CurrentUserId() userId: string,
    @Body() dto: CreateOwnedFigureDto,
  ) {
    return this.ownedFiguresService.create(
      userId,
      dto,
    );
  }

  @ApiOperation({
    summary: 'Update owned figure',
    description:
      'Updates an owned figure belonging to the authenticated user.',
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
    @CurrentUserId() userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateOwnedFigureDto,
  ) {
    return this.ownedFiguresService.update(
      userId,
      id,
      dto,
    );
  }

  @ApiOperation({
    summary: 'Soft delete owned figure',
    description:
      'Soft deletes an owned figure belonging to the authenticated user.',
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
  remove(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.ownedFiguresService.remove(
      userId,
      id,
    );
  }
}
