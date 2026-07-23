import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateLineDto } from './dto/create-lines.dto';
import { UpdateLineDto } from './dto/update-lines.dto';

import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class LinesService {
  constructor(private prisma: PrismaService) {}

async findAll(
  pagination: PaginationQueryDto,
) {
  const { page, limit, search } = pagination;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: null,
    ...(search && {
      name: {
        contains: search,
        mode: 'insensitive' as const,
      },
    }),
  };

  const [lines, total] =
    await this.prisma.$transaction([
      this.prisma.line.findMany({
        where,
        include: {
          manufacturer: true,
          franchise: true,
        },
        orderBy: {
          name: 'asc',
        },
        skip,
        take: limit,
      }),

      this.prisma.line.count({
        where,
      }),
    ]);

  return buildPaginatedResponse(
    lines,
    page,
    limit,
    total,
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