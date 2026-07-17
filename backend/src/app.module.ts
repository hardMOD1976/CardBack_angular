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
import { CollectorsModule } from './collectors/collectors.module';
import { OwnedFiguresModule } from './owned-figures/owned-figures.module';

@Module({
  imports: [
    PrismaModule,
    ManufacturersModule,
    FranchisesModule,
    LinesModule,
    CharactersModule,
    FiguresModule,
    VariantsModule,
    ProductReleasesModule,
    CollectorsModule,
    OwnedFiguresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}