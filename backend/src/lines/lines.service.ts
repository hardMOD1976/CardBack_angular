import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateLineDto } from './dto/create-lines.dto';
import { UpdateLineDto } from './dto/update-lines.dto';
import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

import {
  LineDetailResponseDto,
} from './dto/line-detail.dto';

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
      lines.map((line) => ({
        id: line.id, name: line.name, startYear: line.startYear, endYear: line.endYear,
        scale: line.scale, logo: line.logo, description: line.description,
        manufacturer: { id: line.manufacturer.id, name: line.manufacturer.name },
        franchise: { id: line.franchise.id, name: line.franchise.name, logo: line.franchise.logo },
      })),
      page,
      limit,
      total,
    );
  }

  async findDetail(
    id: string,
  ): Promise<LineDetailResponseDto> {
    const line =
      await this.prisma.line.findFirst({
        where: {
          id,
          deletedAt: null,
        },
        include: {
          manufacturer: true,
          franchise: true,
          figures: {
            where: {
              deletedAt: null,
              character: {
                deletedAt: null,
              },
            },
            include: {
              character: true,
            },
            orderBy: {
              name: 'asc',
            },
          },
        },
      });

    if (!line) {
      throw new NotFoundException(
        `Line with id "${id}" not found`,
      );
    }

    return {
      id: line.id,
      name: line.name,
      startYear: line.startYear,
      endYear: line.endYear,
      scale: line.scale,
      logo: line.logo,
      description: line.description,

      manufacturer: {
        id: line.manufacturer.id,
        name: line.manufacturer.name,
      },

      franchise: {
        id: line.franchise.id,
        name: line.franchise.name,
        logo: line.franchise.logo,
      },

      figures: line.figures.map((figure) => ({
        id: figure.id,
        name: figure.name,
        code: figure.code,
        imageUrl: figure.imageUrl,
        characterId: figure.character.id,
        characterName: figure.character.name,
      })),
    };
  }

  async create(createLineDto: CreateLineDto) {
    return this.prisma.line.create({
      data: createLineDto,
      select: { id: true, name: true, startYear: true, endYear: true, scale: true, logo: true, description: true, manufacturerId: true, franchiseId: true },
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
      select: { id: true, name: true, startYear: true, endYear: true, scale: true, logo: true, description: true, manufacturerId: true, franchiseId: true },
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
      select: { id: true, deletedAt: true },
    });
  }
}
