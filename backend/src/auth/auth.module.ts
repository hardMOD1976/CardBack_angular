import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import type { StringValue } from 'ms';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthThrottleGuard } from './guards/auth-throttle.guard';

@Module({
  imports: [
    UsersModule,
    PrismaModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => {
        const secret = configService.getOrThrow<string>('JWT_SECRET');
        const refreshSecret = configService.getOrThrow<string>('JWT_REFRESH_SECRET');
        if (secret.length < 32 || refreshSecret.length < 32 || secret === refreshSecret) {
          throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be distinct values of at least 32 characters.');
        }
        return {
          secret,
          signOptions: {
            expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN') as StringValue,
          },
        };
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    AuthThrottleGuard,
  ],
})
export class AuthModule {}
