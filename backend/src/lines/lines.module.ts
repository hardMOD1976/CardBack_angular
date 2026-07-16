import { Module } from '@nestjs/common';

import { LinesController } from './lines.controller';
import { LinesService } from './lines.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LinesController],
  providers: [LinesService],
})
export class LinesModule {}