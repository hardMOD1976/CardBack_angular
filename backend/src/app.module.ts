import { Module } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}