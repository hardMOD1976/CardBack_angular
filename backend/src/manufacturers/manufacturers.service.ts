import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

import {
  PaginationQueryDto,
  paginate,
} from '../common/pagination';

@Injectable()
export class ManufacturersService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: PaginationQueryDto,
  ) {
    return paginate(
      this.prisma,
      pagination,

      (skip: number, take: number) =>
        this.prisma.manufacturer.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            name: 'asc',
          },
          skip,
          take,
        }),

      () =>
        this.prisma.manufacturer.count({
          where: {
            deletedAt: null,
          },
        }),
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