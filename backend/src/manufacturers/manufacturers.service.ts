import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

import {
  PaginationQueryDto,
  PaginationMetaDto,
  PaginatedResponseDto,
} from '../common/pagination';

@Injectable()
export class ManufacturersService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: PaginationQueryDto,
  ) {
    const { page, limit } = pagination;

    const skip = (page - 1) * limit;

    const [manufacturers, total] =
      await this.prisma.$transaction([
        this.prisma.manufacturer.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            name: 'asc',
          },
          skip,
          take: limit,
        }),

        this.prisma.manufacturer.count({
          where: {
            deletedAt: null,
          },
        }),
      ]);

    const meta = new PaginationMetaDto();

    meta.page = page;
    meta.limit = limit;
    meta.total = total;
    meta.totalPages = Math.ceil(
      total / limit,
    );

    return new PaginatedResponseDto(
      manufacturers,
      meta,
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