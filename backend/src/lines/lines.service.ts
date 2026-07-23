import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateLineDto } from './dto/create-lines.dto';
import { UpdateLineDto } from './dto/update-lines.dto';

import {
  PaginationQueryDto,
  paginate,
} from '../common/pagination';

@Injectable()
export class LinesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: PaginationQueryDto,
  ) {
    return paginate(
      this.prisma,
      pagination,

      (skip: number, take: number) =>
        this.prisma.line.findMany({
          where: {
            deletedAt: null,
          },
          include: {
            manufacturer: true,
            franchise: true,
          },
          orderBy: {
            name: 'asc',
          },
          skip,
          take,
        }),

      () =>
        this.prisma.line.count({
          where: {
            deletedAt: null,
          },
        }),
    );
  }

  findOne(id: string) {
    return this.prisma.line.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        manufacturer: true,
        franchise: true,
      },
    });
  }

  async create(createLineDto: CreateLineDto) {
    return this.prisma.line.create({
      data: createLineDto,
    });
  }

  async update(
    id: string,
    updateLineDto: UpdateLineDto,
  ) {
    return this.prisma.line.update({
      where: {
        id,
      },
      data: updateLineDto,
    });
  }

  async remove(id: string) {
    return this.prisma.line.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}