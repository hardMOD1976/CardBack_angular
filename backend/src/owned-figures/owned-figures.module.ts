import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { OwnedFiguresController } from './owned-figures.controller';
import { OwnedFiguresService } from './owned-figures.service';

@Module({
  imports: [PrismaModule],
  controllers: [OwnedFiguresController],
  providers: [OwnedFiguresService],
})
export class OwnedFiguresModule {}