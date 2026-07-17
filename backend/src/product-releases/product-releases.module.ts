import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { ProductReleasesController } from './product-releases.controller';
import { ProductReleasesService } from './product-releases.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductReleasesController],
  providers: [ProductReleasesService],
})
export class ProductReleasesModule {}