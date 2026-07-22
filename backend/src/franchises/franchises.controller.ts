import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { FranchisesService } from './franchises.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';

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
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Franchises')
@Controller('franchises')
export class FranchisesController {
  constructor(
    private readonly franchisesService: FranchisesService,
  ) {}

  @ApiOperation({
    summary: 'Get all franchises',
    description:
      'Returns all active franchises ordered alphabetically.',
    operationId: 'findAllFranchises',
  })
  @ApiOkResponse({
    description: 'Franchises retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.franchisesService.findAll();
  }

  @ApiOperation({
    summary: 'Get franchise by id',
    description:
      'Returns an active franchise by its identifier.',
    operationId: 'findFranchiseById',
  })
  @ApiParam({
    name: 'id',
    description: 'Franchise identifier.',
  })
  @ApiOkResponse({
    description: 'Franchise found.',
  })
  @ApiNotFoundResponse({
    description: 'Franchise not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.franchisesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create franchise',
    description:
      'Creates a new franchise in the catalog.',
    operationId: 'createFranchise',
  })
  @ApiCreatedResponse({
    description: 'Franchise created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Franchise already exists.',
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
    createFranchiseDto: CreateFranchiseDto,
  ) {
    return this.franchisesService.create(createFranchiseDto);
  }

  @ApiOperation({
    summary: 'Update franchise',
    description:
      'Updates an existing franchise.',
    operationId: 'updateFranchise',
  })
  @ApiParam({
    name: 'id',
    description: 'Franchise identifier.',
  })
  @ApiOkResponse({
    description: 'Franchise updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Franchise not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate franchise name.',
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
    updateFranchiseDto: UpdateFranchiseDto,
  ) {
    return this.franchisesService.update(
      id,
      updateFranchiseDto,
    );
  }

  @ApiOperation({
    summary: 'Soft delete franchise',
    description:
      'Soft deletes a franchise by setting its deletedAt timestamp.',
    operationId: 'deleteFranchise',
  })
  @ApiParam({
    name: 'id',
    description: 'Franchise identifier.',
  })
  @ApiOkResponse({
    description: 'Franchise deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Franchise not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchisesService.remove(id);
  }
}