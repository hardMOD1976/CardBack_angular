import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @ApiOperation({
    summary: 'Get all manufacturers',
    description: 'Returns all active manufacturers ordered alphabetically.',
    operationId: 'findAllManufacturers',
  })
  @ApiResponse({
    status: 200,
    description: 'Manufacturers retrieved successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.manufacturersService.findAll();
  }

  @ApiOperation({
    summary: 'Get manufacturer by id',
    description: 'Returns an active manufacturer by its identifier.',
    operationId: 'findManufacturerById',
  })
  @ApiParam({
    name: 'id',
    description: 'Manufacturer identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'Manufacturer found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Manufacturer not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create manufacturer',
    description: 'Creates a new manufacturer in the catalog.',
    operationId: 'createManufacturer',
  })
  @ApiResponse({
    status: 201,
    description: 'Manufacturer created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 409,
    description: 'Manufacturer already exists.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturersService.create(createManufacturerDto);
  }

  @ApiOperation({
    summary: 'Update manufacturer',
    description: 'Updates an existing manufacturer.',
    operationId: 'updateManufacturer',
  })
  @ApiParam({
    name: 'id',
    description: 'Manufacturer identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'Manufacturer updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Manufacturer not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate manufacturer name.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return this.manufacturersService.update(id, updateManufacturerDto);
  }

  @ApiOperation({
    summary: 'Soft delete manufacturer',
    description: 'Soft deletes a manufacturer by setting its deletedAt timestamp.',
    operationId: 'deleteManufacturer',
  })
  @ApiParam({
    name: 'id',
    description: 'Manufacturer identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'Manufacturer deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Manufacturer not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturersService.remove(id);
  }
}