import { Injectable, NotFoundException } from '@nestjs/common';

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
    manufacturers.map(({ id, name, country, foundedYear, dissolvedYear }) => ({ id, name, country, foundedYear, dissolvedYear })),
    page,
    limit,
    total,
  );
}

  async findOne(id: string) {
    const manufacturer = await this.prisma.manufacturer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        lines: {
          where: { deletedAt: null, franchise: { deletedAt: null } },
          include: { franchise: { select: { id: true, name: true } } },
          orderBy: { name: 'asc' },
        },
      },
    });
    if (!manufacturer) throw new NotFoundException(`Manufacturer with id '${id}' not found.`);
    return {
      id: manufacturer.id,
      name: manufacturer.name,
      country: manufacturer.country,
      foundedYear: manufacturer.foundedYear,
      dissolvedYear: manufacturer.dissolvedYear,
      lines: manufacturer.lines.map((line) => ({
        id: line.id,
        name: line.name,
        startYear: line.startYear,
        endYear: line.endYear,
        scale: line.scale,
        logo: line.logo,
        franchise: line.franchise,
      })),
    };
  }

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ) {
    return this.prisma.manufacturer.create({
      data: createManufacturerDto,
      select: { id: true, name: true, country: true, foundedYear: true, dissolvedYear: true },
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
      select: { id: true, name: true, country: true, foundedYear: true, dissolvedYear: true },
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
      select: { id: true, deletedAt: true },
    });
  }
}
