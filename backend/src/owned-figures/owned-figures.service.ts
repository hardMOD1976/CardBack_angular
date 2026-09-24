import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateOwnedFigureDto } from './dto/create-owned-figure.dto';
import { UpdateOwnedFigureDto } from './dto/update-owned-figure.dto';
import { OwnedFiguresQueryDto } from './dto/owned-figures-query.dto';
import { buildPaginatedResponse } from '../common/pagination';
import { OwnedFigureResponseDto } from './dto/owned-figure-response.dto';

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
      productRelease: {
        deletedAt: null,
        variant: { deletedAt: null, figure: {
          deletedAt: null,
          character: { deletedAt: null, franchise: { deletedAt: null } },
          line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } },
        } },
      },

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

          include: this.collectionInclude(),

          orderBy,

          skip,
          take: limit,
        }),

        this.prisma.ownedFigure.count({
          where,
        }),
      ]);

    return buildPaginatedResponse(
      ownedFigures.map((item) => this.toResponse(item)),
      page,
      limit,
      total,
    );
  }

  async getStats(userId: string) {
    const where = {
      userId,
      deletedAt: null,
      productRelease: { deletedAt: null, variant: { deletedAt: null, figure: {
        deletedAt: null,
        character: { deletedAt: null, franchise: { deletedAt: null } },
        line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } },
      } } },
    };
    const [aggregate, recent, totalEntries] = await this.prisma.$transaction([
      this.prisma.ownedFigure.aggregate({ where, _sum: { quantity: true, purchasePrice: true, estimatedMarketValue: true }, _count: { _all: true } }),
      this.prisma.ownedFigure.findMany({ where, orderBy: { createdAt: 'desc' }, take: 5, include: this.collectionInclude() }),
      this.prisma.ownedFigure.count({ where }),
    ]);
    return {
      totalEntries,
      totalCopies: aggregate._sum.quantity ?? 0,
      purchaseValue: aggregate._sum.purchasePrice?.toNumber() ?? 0,
      estimatedValue: aggregate._sum.estimatedMarketValue?.toNumber() ?? 0,
      recent: recent.map((entry) => this.toResponse(entry)),
    };
  }

  async findOne(
    userId: string,
    id: string,
  ) {
    await this.ensureOwnedFigureExists(
      userId,
      id,
    );

    const ownedFigure = await this.prisma.ownedFigure.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
        productRelease: {
          deletedAt: null,
          variant: { deletedAt: null, figure: {
            deletedAt: null,
            character: { deletedAt: null, franchise: { deletedAt: null } },
            line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } },
          } },
        },
      },

      include: this.collectionInclude(),
    });
    if (!ownedFigure) throw new NotFoundException(`Owned Figure with id '${id}' not found.`);
    return this.toResponse(ownedFigure);
  }

  async create(
    userId: string,
    dto: CreateOwnedFigureDto,
  ) {
    await this.ensureProductReleaseExists(
      dto.productReleaseId,
    );

    const created = await this.prisma.ownedFigure.create({
      data: {
        ...dto,
        userId,
      },
    });
    return this.findOne(userId, created.id);
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

    const updated = await this.prisma.ownedFigure.update({
      where: {
        id,
      },
      data: dto,
    });
    return this.findOne(userId, updated.id);
  }

  async remove(
    userId: string,
    id: string,
  ) {
    await this.ensureOwnedFigureExists(
      userId,
      id,
    );

    await this.prisma.ownedFigure.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { id, deleted: true };
  }

  private collectionInclude() {
    return {
      productRelease: {
        select: {
          id: true,
          name: true,
          packagingType: true,
          region: true,
          releaseDate: true,
          barcode: true,
          imageUrl: true,
          deletedAt: true,
          variant: {
            select: {
              id: true,
              name: true,
              deletedAt: true,
              figure: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  imageUrl: true,
                  deletedAt: true,
                  character: { select: { id: true, name: true, image: true, deletedAt: true } },
                  line: {
                    select: {
                      id: true,
                      name: true,
                      deletedAt: true,
                      manufacturer: { select: { id: true, name: true, deletedAt: true } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  private toResponse(item: any): OwnedFigureResponseDto {
    const release = item.productRelease;
    const variant = release.variant;
    const figure = variant.figure;
    return {
      id: item.id,
      productReleaseId: item.productReleaseId,
      condition: item.condition,
      completeness: item.completeness,
      packagingState: item.packagingState,
      purchaseDate: item.purchaseDate?.toISOString() ?? null,
      purchasePrice: item.purchasePrice?.toNumber() ?? null,
      currency: item.currency,
      purchaseLocation: item.purchaseLocation,
      estimatedMarketValue: item.estimatedMarketValue?.toNumber() ?? null,
      storageLocation: item.storageLocation,
      notes: item.notes,
      quantity: item.quantity,
      createdAt: item.createdAt.toISOString(),
      productRelease: {
        id: release.id,
        name: release.name,
        packagingType: release.packagingType,
        region: release.region,
        releaseDate: release.releaseDate?.toISOString() ?? null,
        barcode: release.barcode,
        imageUrl: release.imageUrl,
        variant: {
          id: variant.id,
          name: variant.name,
          figure: {
            id: figure.id,
            name: figure.name,
            code: figure.code,
            imageUrl: figure.imageUrl,
            character: { id: figure.character.id, name: figure.character.name, image: figure.character.image },
            line: {
              id: figure.line.id,
              name: figure.line.name,
              manufacturer: { id: figure.line.manufacturer.id, name: figure.line.manufacturer.name },
            },
          },
        },
      },
    };
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
          productRelease: {
            deletedAt: null,
            variant: { deletedAt: null, figure: {
              deletedAt: null,
              character: { deletedAt: null, franchise: { deletedAt: null } },
              line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } },
            } },
          },
        },
      });

    if (!ownedFigure) {
      throw new NotFoundException(
        `Owned Figure with id '${id}' not found.`,
      );
    }
  }
}
