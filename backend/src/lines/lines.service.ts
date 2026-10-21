import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateLineDto } from './dto/create-lines.dto';
import { UpdateLineDto } from './dto/update-lines.dto';
import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

import { LineDetailResponseDto } from './dto/line-detail.dto';

@Injectable()
export class LinesService {
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

    const [lines, total] = await this.prisma.$transaction([
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
      this.prisma.line.count({ where }),
    ]);

    return buildPaginatedResponse(
      lines.map((line) => ({
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
      })),
      page,
      limit,
      total,
    );
  }

  async findDetail(id: string): Promise<LineDetailResponseDto> {
    const line = await this.prisma.line.findFirst({
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
      throw new NotFoundException(`Line with id '${id}' not found.`);
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
    await this.ensureActiveManufacturer(createLineDto.manufacturerId);
    await this.ensureActiveFranchise(createLineDto.franchiseId);

    try {
      return await this.prisma.line.create({
        data: createLineDto,
        select: {
          id: true,
          name: true,
          startYear: true,
          endYear: true,
          scale: true,
          logo: true,
          description: true,
          manufacturerId: true,
          franchiseId: true,
        },
      });
    } catch (error: unknown) {
      this.rethrowLineWriteError(error);
    }
  }

  async update(id: string, updateLineDto: UpdateLineDto) {
    const existingLine = await this.prisma.line.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!existingLine) {
      throw new NotFoundException(`Active line with id '${id}' not found.`);
    }

    if (updateLineDto.manufacturerId !== undefined) {
      await this.ensureActiveManufacturer(updateLineDto.manufacturerId);
    }

    if (updateLineDto.franchiseId !== undefined) {
      await this.ensureActiveFranchise(updateLineDto.franchiseId);
    }

    try {
      return await this.prisma.line.update({
        where: {
          id,
        },
        data: updateLineDto,
        select: {
          id: true,
          name: true,
          startYear: true,
          endYear: true,
          scale: true,
          logo: true,
          description: true,
          manufacturerId: true,
          franchiseId: true,
        },
      });
    } catch (error: unknown) {
      this.rethrowLineWriteError(error);
    }
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (transaction) => {
      const line = await transaction.line.findFirst({
        where: {
          id,
          deletedAt: null,
        },
        select: {
          id: true,
          name: true,
          figures: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
            },
          },
        },
      });

      if (!line) {
        throw new NotFoundException(`Active line with id '${id}' not found.`);
      }

      if (line.figures.length > 0) {
        throw new ConflictException(
          `Cannot delete line '${line.name}' while it has active figures. Archive or reassign its active figures first.`,
        );
      }

      return transaction.line.update({
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

  private async ensureActiveManufacturer(id: string): Promise<void> {
    const manufacturer = await this.prisma.manufacturer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!manufacturer) {
      throw new NotFoundException(
        `Active manufacturer with id '${id}' not found.`,
      );
    }
  }

  private async ensureActiveFranchise(id: string): Promise<void> {
    const franchise = await this.prisma.franchise.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!franchise) {
      throw new NotFoundException(`Active franchise with id '${id}' not found.`);
    }
  }

  private rethrowLineWriteError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A line with these details already exists.',
        );
      }

      if (error.code === 'P2003') {
        throw new NotFoundException(
          'The selected manufacturer or franchise does not exist or is inactive.',
        );
      }

      if (error.code === 'P2025') {
        throw new NotFoundException('The requested active line was not found.');
      }
    }

    throw error;
  }
}
