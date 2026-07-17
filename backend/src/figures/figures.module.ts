import { Module } from '@nestjs/common';
import { FiguresController } from './figures.controller';
import { FiguresService } from './figures.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FiguresController],
  providers: [FiguresService],
})
export class FiguresModule {}