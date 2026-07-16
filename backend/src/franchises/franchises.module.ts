import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FranchisesController } from './franchises.controller';
import { FranchisesService } from './franchises.service';

@Module({
  imports: [PrismaModule],
  controllers: [FranchisesController],
  providers: [FranchisesService],
})
export class FranchisesModule {}