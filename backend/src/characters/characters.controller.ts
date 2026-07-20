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

import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService,
  ) {}

  @ApiOperation({
    summary: 'Get all characters',
    description:
      'Returns all active characters ordered alphabetically.',
    operationId: 'findAllCharacters',
  })
  @ApiOkResponse({
    description: 'Characters retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @ApiOperation({
    summary: 'Get character by id',
    description:
      'Returns an active character by its identifier.',
    operationId: 'findCharacterById',
  })
  @ApiParam({
    name: 'id',
    description: 'Character identifier.',
  })
  @ApiOkResponse({
    description: 'Character found.',
  })
  @ApiNotFoundResponse({
    description: 'Character not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create character',
    description:
      'Creates a new character associated with an existing franchise.',
    operationId: 'createCharacter',
  })
  @ApiCreatedResponse({
    description: 'Character created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Franchise not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate character.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post()
  create(
    @Body()
    createCharacterDto: CreateCharacterDto,
  ) {
    return this.charactersService.create(createCharacterDto);
  }

  @ApiOperation({
    summary: 'Update character',
    description: 'Updates an existing character.',
    operationId: 'updateCharacter',
  })
  @ApiParam({
    name: 'id',
    description: 'Character identifier.',
  })
  @ApiOkResponse({
    description: 'Character updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'Character or Franchise not found.',
  })
  @ApiConflictResponse({
    description: 'Duplicate character.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(
      id,
      updateCharacterDto,
    );
  }

  @ApiOperation({
    summary: 'Soft delete character',
    description:
      'Soft deletes a character by setting its deletedAt timestamp.',
    operationId: 'deleteCharacter',
  })
  @ApiParam({
    name: 'id',
    description: 'Character identifier.',
  })
  @ApiOkResponse({
    description: 'Character deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Character not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}