import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';

@Injectable()
export class CollectorsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.collector.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        username: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.collector.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  create(createCollectorDto: CreateCollectorDto) {
    return this.prisma.collector.create({
      data: createCollectorDto,
    });
  }

  update(
    id: string,
    updateCollectorDto: UpdateCollectorDto,
  ) {
    return this.prisma.collector.update({
      where: {
        id,
      },
      data: updateCollectorDto,
    });
  }

  remove(id: string) {
    return this.prisma.collector.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}