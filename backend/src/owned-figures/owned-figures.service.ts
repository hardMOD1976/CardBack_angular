import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateOwnedFigureDto } from './dto/create-owned-figure.dto';
import { UpdateOwnedFigureDto } from './dto/update-owned-figure.dto';
import { OwnedFiguresQueryDto } from './dto/owned-figures-query.dto';
import { buildPaginatedResponse } from '../common/pagination';

@Injectable()
export class OwnedFiguresService {
  constructor(private prisma: PrismaService) {}

  async ensureProductReleaseExists(id: string) {
    const release = await this.prisma.productRelease.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!release) {
      throw new NotFoundException(
        `Product Release with id '${id}' not found.`,
      );
    }
  }

  async findAll(
    userId: string,
    pagination: OwnedFiguresQueryDto,
  ) {
    const {
      page,
      limit,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      condition,
      completeness,
      packagingState,
    } = pagination;

    const skip = (page - 1) * limit;

    const where = {
      userId,
      deletedAt: null,

      ...(condition && {
        condition,
      }),

      ...(completeness && {
        completeness,
      }),

      ...(packagingState && {
        packagingState,
      }),

      ...(search && {
        OR: [
          {
            condition: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            completeness: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            packagingState: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            purchaseLocation: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            storageLocation: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            notes: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            currency: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            productRelease: {
              name: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          },
          {
            productRelease: {
              barcode: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          },
        ],
      }),
    };

    const orderBy = this.buildOrderBy(
      sortBy,
      sortOrder,
    );

    const [ownedFigures, total] =
      await this.prisma.$transaction([
        this.prisma.ownedFigure.findMany({
          where,

          include: {
            user: true,

            productRelease: {
              include: {
                variant: {
                  include: {
                    figure: {
                      include: {
                        character: true,

                        line: {
                          include: {
                            manufacturer: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },

          orderBy,

          skip,
          take: limit,
        }),

        this.prisma.ownedFigure.count({
          where,
        }),
      ]);

    return buildPaginatedResponse(
      ownedFigures,
      page,
      limit,
      total,
    );
  }

  async findOne(
    userId: string,
    id: string,
  ) {
    await this.ensureOwnedFigureExists(
      userId,
      id,
    );

    return this.prisma.ownedFigure.findFirst({
      where: {
        id,
        userId,
      },

      include: {
        user: true,

        productRelease: {
          include: {
            variant: {
              include: {
                figure: {
                  include: {
                    character: true,

                    line: {
                      include: {
                        manufacturer: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async create(
    userId: string,
    dto: CreateOwnedFigureDto,
  ) {
    await this.ensureProductReleaseExists(
      dto.productReleaseId,
    );

    return this.prisma.ownedFigure.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateOwnedFigureDto,
  ) {
    await this.ensureOwnedFigureExists(
      userId,
      id,
    );

    if (dto.productReleaseId) {
      await this.ensureProductReleaseExists(
        dto.productReleaseId,
      );
    }

    return this.prisma.ownedFigure.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(
    userId: string,
    id: string,
  ) {
    await this.ensureOwnedFigureExists(
      userId,
      id,
    );

    return this.prisma.ownedFigure.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  private buildOrderBy(
    sortBy: OwnedFiguresQueryDto['sortBy'],
    sortOrder: OwnedFiguresQueryDto['sortOrder'],
  ) {
    switch (sortBy) {
      case 'condition':
        return {
          condition: sortOrder,
        };

      case 'completeness':
        return {
          completeness: sortOrder,
        };

      case 'packagingState':
        return {
          packagingState: sortOrder,
        };

      case 'purchasePrice':
        return {
          purchasePrice: sortOrder,
        };

      case 'purchaseDate':
        return {
          purchaseDate: sortOrder,
        };

      case 'estimatedMarketValue':
        return {
          estimatedMarketValue: sortOrder,
        };

      case 'productReleaseName':
        return {
          productRelease: {
            name: sortOrder,
          },
        };

      case 'createdAt':
      default:
        return {
          createdAt: sortOrder,
        };
    }
  }

  private async ensureOwnedFigureExists(
    userId: string,
    id: string,
  ) {
    const ownedFigure =
      await this.prisma.ownedFigure.findFirst({
        where: {
          id,
          userId,
          deletedAt: null,
        },
      });

    if (!ownedFigure) {
      throw new NotFoundException(
        `Owned Figure with id '${id}' not found.`,
      );
    }
  }
}