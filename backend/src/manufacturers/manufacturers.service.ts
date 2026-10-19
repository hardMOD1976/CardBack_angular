import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

import {
  ManufacturerDetailResponseDto,
} from './dto/manufacturer-detail-response.dto';

import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class ManufacturersService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: PaginationQueryDto) {
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

    const [manufacturers, total] = await this.prisma.$transaction([
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
      manufacturers.map(({ id, name, country, foundedYear, dissolvedYear }) => ({
        id,
        name,
        country,
        foundedYear,
        dissolvedYear,
      })),
      page,
      limit,
      total,
    );
  }

  async findDetail(id: string): Promise<ManufacturerDetailResponseDto> {
    const manufacturer = await this.prisma.manufacturer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        country: true,
        foundedYear: true,
        dissolvedYear: true,
        lines: {
          where: {
            deletedAt: null,
            franchise: {
              deletedAt: null,
            },
          },
          select: {
            id: true,
            name: true,
            startYear: true,
            endYear: true,
            scale: true,
            logo: true,
            franchise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    });

    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with id '${id}' not found.`);
    }

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
        franchise: {
          id: line.franchise.id,
          name: line.franchise.name,
        },
      })),
    };
  }

  async create(createManufacturerDto: CreateManufacturerDto) {
    try {
      return await this.prisma.manufacturer.create({
        data: createManufacturerDto,
        select: {
          id: true,
          name: true,
          country: true,
          foundedYear: true,
          dissolvedYear: true,
        },
      });
    } catch (error: unknown) {
      this.rethrowManufacturerWriteError(error);
    }
  }

  async update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    try {
      return await this.prisma.manufacturer.update({
        where: {
          id,
        },
        data: updateManufacturerDto,
        select: {
          id: true,
          name: true,
          country: true,
          foundedYear: true,
          dissolvedYear: true,
        },
      });
    } catch (error: unknown) {
      this.rethrowManufacturerWriteError(error);
    }
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (transaction) => {
      const manufacturer = await transaction.manufacturer.findFirst({
        where: {
          id,
          deletedAt: null,
        },
        select: {
          id: true,
          name: true,
          lines: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
            },
          },
        },
      });

      if (!manufacturer) {
        throw new NotFoundException(`Manufacturer with id '${id}' not found.`);
      }

      if (manufacturer.lines.length > 0) {
        throw new ConflictException(
          `Cannot delete manufacturer '${manufacturer.name}' while it has active lines. Archive or reassign its active lines first.`,
        );
      }

      return transaction.manufacturer.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
        select: {
          id: true,
          deletedAt: true,
        },
      });
    });
  }

  private rethrowManufacturerWriteError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('A manufacturer with this name already exists.');
    }

    throw error;
  }
}
