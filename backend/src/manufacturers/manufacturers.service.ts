import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

import {
   PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class ManufacturersService {
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

  const [manufacturers, total] =
    await this.prisma.$transaction([
      this.prisma.manufacturer.findMany({
        where,
        orderBy: {
          name: 'asc',
        },
        skip,
        take: limit,
      }),

      this.prisma.manufacturer.count({
        where,
      }),
    ]);

  return buildPaginatedResponse(
    manufacturers,
    page,
    limit,
    total,
  );
}

  findOne(id: string) {
    return this.prisma.manufacturer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ) {
    return this.prisma.manufacturer.create({
      data: createManufacturerDto,
    });
  }

  async update(
    id: string,
    updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return this.prisma.manufacturer.update({
      where: {
        id,
      },
      data: updateManufacturerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.manufacturer.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}