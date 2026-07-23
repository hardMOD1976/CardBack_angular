import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';

import {
  PaginationQueryDto,
  paginate,
} from '../common/pagination';

@Injectable()
export class FranchisesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: PaginationQueryDto,
  ) {
    return paginate(
      this.prisma,
      pagination,

      (skip: number, take: number) =>
        this.prisma.franchise.findMany({
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
        this.prisma.franchise.count({
          where: {
            deletedAt: null,
          },
        }),
    );
  }

  findOne(id: string) {
    return this.prisma.franchise.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async create(
    createFranchiseDto: CreateFranchiseDto,
  ) {
    return this.prisma.franchise.create({
      data: createFranchiseDto,
    });
  }

  async update(
    id: string,
    updateFranchiseDto: UpdateFranchiseDto,
  ) {
    return this.prisma.franchise.update({
      where: {
        id,
      },
      data: updateFranchiseDto,
    });
  }

  async remove(id: string) {
    return this.prisma.franchise.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}