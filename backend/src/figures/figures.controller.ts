
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
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
  ApiQuery,
} from '@nestjs/swagger';

import { FiguresService } from './figures.service';

import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { FigureDetailResponseDto } from './dto/figure-detail-response.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

import { Role } from '@prisma/client';
import { PaginationQueryDto } from '../common/pagination';

@ApiTags('Figures')
@ApiBearerAuth('access-token')
@Controller('figures')
export class FiguresController {
  constructor(
    private readonly figuresService: FiguresService,
  ) {}

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
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 20,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'vader',
  })
  @Public()
  @Get()
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

    return this.figuresService.findAll(pagination);
  }

  @ApiOperation({
    summary: 'Get figure by id',
    description:
      'Returns an active figure by its identifier, including its character, line and active variants.',
    operationId: 'findFigureById',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Figure found.',
    type: FigureDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Figure not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.figuresService.findDetail(id);
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
    description:
      'Character or Line not found or not active.',
  })
  @ApiConflictResponse({
    description: 'Duplicate figure.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createFigureDto: CreateFigureDto) {
    return this.figuresService.create(createFigureDto);
  }

  @ApiOperation({
    summary: 'Update figure',
    description:
      'Updates an active figure and validates any new character or line references.',
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
    description:
      'Figure, Character or Line not found or not active.',
  })
  @ApiConflictResponse({
    description: 'Duplicate figure.',
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
    @Body() updateFigureDto: UpdateFigureDto,
  ) {
    return this.figuresService.update(id, updateFigureDto);
  }

  @ApiOperation({
    summary: 'Soft delete figure',
    description:
      'Archives an active figure by setting its deletedAt timestamp. Active variants must be archived first.',
    operationId: 'deleteFigure',
  })
  @ApiParam({
    name: 'id',
    description: 'Figure identifier.',
  })
  @ApiOkResponse({
    description: 'Figure archived successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Figure not found or already archived.',
  })
  @ApiConflictResponse({
    description:
      'Figure cannot be archived while it has active variants.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.figuresService.remove(id);
  }
}
