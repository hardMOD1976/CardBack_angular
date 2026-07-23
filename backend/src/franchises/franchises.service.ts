import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';

import {
   PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class FranchisesService {
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

  const [franchises, total] =
    await this.prisma.$transaction([
      this.prisma.franchise.findMany({
        where,
        orderBy: {
          name: 'asc',
        },
        skip,
        take: limit,
      }),

      this.prisma.franchise.count({
        where,
      }),
    ]);

  return buildPaginatedResponse(
    franchises,
    page,
    limit,
    total,
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