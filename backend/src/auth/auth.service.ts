import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import type { StringValue } from 'ms';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ) {
    const user =
      await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    return user;
  }

 async login(loginDto: LoginDto) {
  const user = await this.validateUser(
    loginDto.username,
    loginDto.password,
  );

  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  };

  const accessToken =
    await this.jwtService.signAsync(payload);

  const refreshToken =
    await this.jwtService.signAsync(payload, {
      secret:
        this.configService.getOrThrow<string>(
          'JWT_REFRESH_SECRET',
        ),
      expiresIn:
        this.configService.getOrThrow<string>(
          'JWT_REFRESH_EXPIRES_IN',
        ) as StringValue,
    });

  const refreshTokenHash =
    await bcrypt.hash(refreshToken, 10);

  await this.usersService.updateRefreshToken(
    user.id,
    refreshTokenHash,
  );

  return {
    accessToken,
    refreshToken,
  };
}

async refresh(refreshToken: string) {
  try {
    const payload =
      await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret:
            this.configService.getOrThrow<string>(
              'JWT_REFRESH_SECRET',
            ),
        },
      );

    const user = await this.usersService.findOne(
      payload.sub,
    );

    if (
      !user ||
      !user.refreshTokenHash
    ) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    const tokenMatches =
      await bcrypt.compare(
        refreshToken,
        user.refreshTokenHash,
      );

    if (!tokenMatches) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    const newPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken =
      await this.jwtService.signAsync(
        newPayload,
      );

    const newRefreshToken =
      await this.jwtService.signAsync(
        newPayload,
        {
          secret:
            this.configService.getOrThrow<string>(
              'JWT_REFRESH_SECRET',
            ),
          expiresIn:
            this.configService.getOrThrow<string>(
              'JWT_REFRESH_EXPIRES_IN',
            ) as StringValue,
        },
      );

    const refreshTokenHash =
      await bcrypt.hash(
        newRefreshToken,
        10,
      );

    await this.usersService.updateRefreshToken(
      user.id,
      refreshTokenHash,
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch {
    throw new UnauthorizedException(
      'Invalid refresh token',
    );
  }
}

async logout(userId: string) {
  await this.usersService.updateRefreshToken(
    userId,
    null,
  );

  return {
    message: 'Logged out successfully',
  };
}

}