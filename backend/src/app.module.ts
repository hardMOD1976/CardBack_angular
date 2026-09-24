import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { FranchisesModule } from './franchises/franchises.module';
import { LinesModule } from './lines/lines.module';
import { CharactersModule } from './characters/characters.module';
import { FiguresModule } from './figures/figures.module';
import { VariantsModule } from './variants/variants.module';
import { ProductReleasesModule } from './product-releases/product-releases.module';
import { UsersModule } from './users/users.module';
import { OwnedFiguresModule } from './owned-figures/owned-figures.module';

import { GlobalSearchModule } from './global-search/global-search.module';

import { AuthModule } from './auth/auth.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AiModule } from './ai/ai.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,

    ManufacturersModule,
    FranchisesModule,
    LinesModule,
    CharactersModule,
    FiguresModule,
    VariantsModule,
    ProductReleasesModule,
    UsersModule,
    OwnedFiguresModule,

    GlobalSearchModule,

    AuthModule,
    WishlistModule,
    AiModule,
  ],

  controllers: [
    AppController,
  ],

  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
