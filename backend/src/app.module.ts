import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { FranchisesModule } from './franchises/franchises.module';
import { LinesModule } from './lines/lines.module';

@Module({
  imports: [
    PrismaModule,
    ManufacturersModule,
    FranchisesModule,
    LinesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}