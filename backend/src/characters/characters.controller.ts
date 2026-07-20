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

import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({
    summary: 'Get all characters',
    description:
      'Returns all active characters ordered alphabetically.',
  })
  @ApiResponse({
    status: 200,
    description: 'Characters retrieved successfully.',
  })
  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @ApiOperation({
    summary: 'Get character by id',
    description: 'Returns a single character.',
  })
  @ApiParam({
    name: 'id',
    description: 'Character identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Character found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Character not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create character',
    description:
      'Creates a new character associated with an existing franchise.',
  })
  @ApiResponse({
    status: 201,
    description: 'Character created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 404,
    description: 'Franchise not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate character.',
  })
  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @ApiOperation({
    summary: 'Update character',
    description: 'Updates an existing character.',
  })
  @ApiParam({
    name: 'id',
    description: 'Character identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Character updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Character or Franchise not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate character.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @ApiOperation({
    summary: 'Soft delete character',
    description:
      'Marks a character as deleted without removing it from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'Character identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Character deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Character not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}