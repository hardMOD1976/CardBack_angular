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
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationQueryDto } from '../common/pagination';

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
  @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    const pagination: PaginationQueryDto = {
      page: Number(page),
      limit: Number(limit),
    };
    return this.ownedFiguresService.findAll(pagination);
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
  @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.ownedFiguresService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create owned figure',
    description:
      'Adds a product release to a user collection.',
    operationId: 'createOwnedFigure',
  })
  @ApiCreatedResponse({
    description: 'Owned figure created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'User or Product Release not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
   @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
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
      'Updates user-specific information for an owned figure.',
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
   @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
   @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownedFiguresService.remove(id);
  }
}