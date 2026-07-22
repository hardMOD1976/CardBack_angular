import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
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

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: 'Get all users',
    description:
      'Returns all active users ordered alphabetically.',
    operationId: 'findAllUsers',
  })
  @ApiOkResponse({
    description: 'Users retrieved successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user by id',
    description:
      'Returns an active user by its identifier.',
    operationId: 'findUserById',
  })
  @ApiParam({
    name: 'id',
    description: 'User identifier.',
  })
  @ApiOkResponse({
    description: 'User found.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user account.',
    operationId: 'createUser',
  })
  @ApiCreatedResponse({
    description: 'User created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Username or email already exists.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  // @Post()
  // create(
  //   @Body()
  //   createUserDto: CreateUserDto,
  // ) {
  //   return this.usersService.create(
  //     createUserDto,
  //   );
  // }

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates an existing user.',
    operationId: 'updateUser',
  })
  @ApiParam({
    name: 'id',
    description: 'User identifier.',
  })
  @ApiOkResponse({
    description: 'User updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiConflictResponse({
    description: 'Username or email already exists.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      id,
      updateUserDto,
    );
  }

  @ApiOperation({
    summary: 'Soft delete user',
    description:
      'Soft deletes a user by setting its deletedAt timestamp.',
    operationId: 'deleteUser',
  })
  @ApiParam({
    name: 'id',
    description: 'User identifier.',
  })
  @ApiOkResponse({
    description: 'User deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}