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

import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

import { Role } from '@prisma/client';

import { PaginationQueryDto } from '../common/pagination';

@ApiTags('Manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(
    private readonly manufacturersService: ManufacturersService,
  ) {}

  @ApiOperation({
    summary: 'Get all manufacturers',
    description:
      'Returns all active manufacturers ordered alphabetically.',
    operationId: 'findAllManufacturers',
  })
  @ApiOkResponse({
    description: 'Manufacturers retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
@Public()
findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 20,
  @Query('search') search?: string,
) {
  return this.manufacturersService.findAll({
    page: Number(page),
    limit: Number(limit),
    search,
  });
}

  @ApiOperation({
    summary: 'Get manufacturer by id',
    description:
      'Returns an active manufacturer by its identifier.',
    operationId: 'findManufacturerById',
  })
  @ApiParam({
    name: 'id',
    description: 'Manufacturer identifier.',
  })
  @ApiOkResponse({
    description: 'Manufacturer found.',
  })
  @ApiNotFoundResponse({
    description: 'Manufacturer not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create manufacturer',
    description:
      'Creates a new manufacturer in the catalog.',
    operationId: 'createManufacturer',
  })
  @ApiCreatedResponse({
    description: 'Manufacturer created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Manufacturer already exists.',
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
    createManufacturerDto: CreateManufacturerDto,
  ) {
    return this.manufacturersService.create(
      createManufacturerDto,
    );
  }

  @ApiOperation({
    summary: 'Update manufacturer',
    description:
      'Updates an existing manufacturer.',
    operationId: 'updateManufacturer',
  })
  @ApiParam({
    name: 'id',
    description: 'Manufacturer identifier.',
  })
  @ApiOkResponse({
    description: 'Manufacturer updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Manufacturer not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate manufacturer name.',
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
    updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return this.manufacturersService.update(
      id,
      updateManufacturerDto,
    );
  }

  @ApiOperation({
    summary: 'Soft delete manufacturer',
    description:
      'Soft deletes a manufacturer by setting its deletedAt timestamp.',
    operationId: 'deleteManufacturer',
  })
  @ApiParam({
    name: 'id',
    description: 'Manufacturer identifier.',
  })
  @ApiOkResponse({
    description: 'Manufacturer deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Manufacturer not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturersService.remove(id);
  }
}