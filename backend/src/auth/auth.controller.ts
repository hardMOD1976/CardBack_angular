import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import type { Request } from 'express';

import { AuthService } from './auth.service';

import {
  LoginDto,
  RefreshTokenDto,
} from './dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Public } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'User login',
  })
  @ApiBody({
    type: LoginDto,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
  })
  @ApiBody({
    type: RefreshTokenDto,
  })
  refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refresh(
      refreshTokenDto.refreshToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({
    summary: 'Logout current user',
  })
  logout(@Req() req: Request) {
    return this.authService.logout(
      (req.user as any).sub,
    );
  }
}