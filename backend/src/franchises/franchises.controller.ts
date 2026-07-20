import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FranchisesService } from './franchises.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

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
  })
  @ApiResponse({
    status: 200,
    description: 'Franchises retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.franchisesService.findAll();
  }

  @ApiOperation({
    summary: 'Get franchise by id',
    description: 'Returns a single franchise.',
  })
  @ApiParam({
    name: 'id',
    description: 'Franchise identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Franchise found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Franchise not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.franchisesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create franchise',
    description: 'Creates a new franchise in the catalog.',
  })
  @ApiResponse({
    status: 201,
    description: 'Franchise created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 409,
    description: 'Franchise already exists.',
  })
  @Post()
  create(
    @Body() createFranchiseDto: CreateFranchiseDto,
  ) {
    return this.franchisesService.create(createFranchiseDto);
  }

  @ApiOperation({
    summary: 'Update franchise',
    description: 'Updates an existing franchise.',
  })
  @ApiParam({
    name: 'id',
    description: 'Franchise identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Franchise updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Franchise not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate franchise name.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFranchiseDto: UpdateFranchiseDto,
  ) {
    return this.franchisesService.update(
      id,
      updateFranchiseDto,
    );
  }

  @ApiOperation({
    summary: 'Soft delete franchise',
    description:
      'Marks a franchise as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Franchise identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Franchise deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Franchise not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchisesService.remove(id);
  }
}