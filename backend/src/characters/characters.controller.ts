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

import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';
import { PaginationQueryDto } from '../common/pagination';

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
// @Public()
// @Get()
// findAll(
//   @Query()
//   pagination: PaginationQueryDto,
// ) {
//   return this.charactersService.findAll(
//     pagination,
//   );
// }

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

  return this.charactersService.findAll(
    pagination,
  );
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
  @Public()
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
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
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
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}