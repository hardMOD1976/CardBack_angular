import {
  Get,
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
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Public } from './decorators/public.decorator';
import { AuthThrottleGuard } from './guards/auth-throttle.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @UseGuards(AuthThrottleGuard)
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
  @Get('config')
  configuration() {
    return { passwordRecoveryEnabled: this.authService.passwordRecoveryEnabled() };
  }

  @Public()
  @UseGuards(AuthThrottleGuard)
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @UseGuards(AuthThrottleGuard)
  @Post('password/forgot')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @UseGuards(AuthThrottleGuard)
  @Post('password/reset')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(JwtAuthGuard, AuthThrottleGuard)
  @Post('password/change')
  changePassword(@Req() req: Request, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword((req.user as { sub: string }).sub, dto);
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
