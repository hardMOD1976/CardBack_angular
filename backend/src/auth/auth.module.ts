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

@Module({
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        secret:
          configService.getOrThrow<string>(
            'JWT_SECRET',
          ),

        signOptions: {
          expiresIn:
            configService.getOrThrow<string>(
              'JWT_EXPIRES_IN',
            ) as StringValue,
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}