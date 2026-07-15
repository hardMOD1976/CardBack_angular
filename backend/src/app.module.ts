import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';

@Module({
  imports: [
    PrismaModule,
    ManufacturersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}