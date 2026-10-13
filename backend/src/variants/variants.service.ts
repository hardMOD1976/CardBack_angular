import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { VariantDetailResponseDto } from './dto/variant-detail-response.dto';

import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: PaginationQueryDto,
  ) {
    const { page, limit, search } = pagination;
    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,

      figure: {
        deletedAt: null,

        character: {
          deletedAt: null,

          franchise: {
            deletedAt: null,
          },
        },

        line: {
          deletedAt: null,

          manufacturer: {
            deletedAt: null,
          },

          franchise: {
            deletedAt: null,
          },
        },
      },

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [variants, total] =
      await this.prisma.$transaction([
        this.prisma.variant.findMany({
          where,

          select: {
            id: true,
            name: true,
            description: true,
            imageUrl: true,

            figure: {
              select: {
                id: true,
                name: true,
                code: true,
                imageUrl: true,

                character: {
                  select: {
                    id: true,
                    name: true,
                  },
                },

                line: {
                  select: {
                    id: true,
                    name: true,

                    manufacturer: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },

          orderBy: {
            name: 'asc',
          },

          skip,
          take: limit,
        }),

        this.prisma.variant.count({
          where,
        }),
      ]);

    return buildPaginatedResponse(
      variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        description: variant.description,
        imageUrl: variant.imageUrl,

        figure: {
          id: variant.figure.id,
          name: variant.figure.name,
          code: variant.figure.code,
          imageUrl: variant.figure.imageUrl,

          character: variant.figure.character,

          line: variant.figure.line,
        },
      })),
      page,
      limit,
      total,
    );
  }

  async findDetail(
    id: string,
  ): Promise<VariantDetailResponseDto> {
    const variant =
      await this.prisma.variant.findFirst({
        where: {
          id,
          deletedAt: null,

          figure: {
            deletedAt: null,

            character: {
              deletedAt: null,

              franchise: {
                deletedAt: null,
              },
            },

            line: {
              deletedAt: null,

              manufacturer: {
                deletedAt: null,
              },

              franchise: {
                deletedAt: null,
              },
            },
          },
        },

        include: {
          figure: {
            include: {
              character: {
                include: {
                  franchise: true,
                },
              },

              line: {
                include: {
                  manufacturer: true,
                  franchise: true,
                },
              },
            },
          },

          productReleases: {
            where: {
              deletedAt: null,
            },

            orderBy: {
              name: 'asc',
            },
          },
        },
      });

    if (!variant) {
      throw new NotFoundException(
        `Variant with id '${id}' not found.`,
      );
    }

    return {
      id: variant.id,
      name: variant.name,
      description: variant.description,
      imageUrl: variant.imageUrl,

      figure: {
        id: variant.figure.id,
        name: variant.figure.name,
        code: variant.figure.code,
        imageUrl: variant.figure.imageUrl,

        character: {
          id: variant.figure.character.id,
          name: variant.figure.character.name,
          image: variant.figure.character.image,
        },

        line: {
          id: variant.figure.line.id,
          name: variant.figure.line.name,
          scale: variant.figure.line.scale,

          manufacturer: {
            id: variant.figure.line.manufacturer.id,
            name: variant.figure.line.manufacturer.name,
          },
        },

        franchise: {
          id: variant.figure.character.franchise.id,
          name: variant.figure.character.franchise.name,
        },
      },

      productReleases:
        variant.productReleases.map((release) => ({
          id: release.id,
          name: release.name,
          packagingType: release.packagingType,
          region: release.region,
          language: release.language,
          retailer: release.retailer,
          releaseDate:
            release.releaseDate?.toISOString() ?? null,
          barcode: release.barcode,
          imageUrl: release.imageUrl,
          notes: release.notes,
        })),
    };
  }

  async create(
    createVariantDto: CreateVariantDto,
  ) {
    await this.ensureFigureExists(
      createVariantDto.figureId,
    );

    return this.prisma.variant.create({
      data: createVariantDto,

      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        figureId: true,
      },
    });
  }

  async update(
    id: string,
    updateVariantDto: UpdateVariantDto,
  ) {
    if (updateVariantDto.figureId) {
      await this.ensureFigureExists(
        updateVariantDto.figureId,
      );
    }

    return this.prisma.variant.update({
      where: {
        id,
      },

      data: updateVariantDto,

      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        figureId: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.variant.update({
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
  }

  private async ensureFigureExists(
    figureId: string,
  ) {
    const figure =
      await this.prisma.figure.findFirst({
        where: {
          id: figureId,
          deletedAt: null,
        },
      });

    if (!figure) {
      throw new NotFoundException(
        `Figure with id '${figureId}' not found.`,
      );
    }
  }
}