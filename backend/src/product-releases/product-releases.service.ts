import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProductReleaseDto } from './dto/create-product-release.dto';
import { UpdateProductReleaseDto } from './dto/update-product-release.dto';
import { ProductReleaseResponseDto } from './dto/product-release-response.dto';

import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class ProductReleasesService {
  constructor(private prisma: PrismaService) {}

async findAll(
  pagination: PaginationQueryDto,
) {

   try {

    const { page, limit } = pagination;

    const skip = (page - 1) * limit;

  const where = {
    deletedAt: null,
    variant: {
      deletedAt: null,
      figure: {
        deletedAt: null,
        character: { deletedAt: null },
        line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } },
      },
    },

    ...(pagination.search && {
      OR: [
        {
          name: {
            contains: pagination.search,
            mode: 'insensitive' as const,
          },
        },
        {
          barcode: {
            contains: pagination.search,
            mode: 'insensitive' as const,
          },
        },
        {
          packagingType: {
            contains: pagination.search,
            mode: 'insensitive' as const,
          },
        },
        {
          region: {
            contains: pagination.search,
            mode: 'insensitive' as const,
          },
        },
        {
          language: {
            contains: pagination.search,
            mode: 'insensitive' as const,
          },
        },
        {
          retailer: {
            contains: pagination.search,
            mode: 'insensitive' as const,
          },
        },
        {
          notes: {
            contains: pagination.search,
            mode: 'insensitive' as const,
          },
        },

        // Variant
        {
          variant: {
            name: {
              contains: pagination.search,
              mode: 'insensitive' as const,
            },
          },
        },

        // Figure
        {
          variant: {
            figure: {
              name: {
                contains: pagination.search,
                mode: 'insensitive' as const,
              },
            },
          },
        },

        // Character
        {
          variant: {
            figure: {
              character: {
                name: {
                  contains: pagination.search,
                  mode: 'insensitive' as const,
                },
              },
            },
          },
        },
      ],
    }),
  };

  const [productReleases, total] =
    await this.prisma.$transaction([
      this.prisma.productRelease.findMany({
        where,

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

        orderBy: {
          name: 'asc',
        },

        skip,
        take: limit,
      }),

      this.prisma.productRelease.count({
        where,
      }),
    ]);

  return buildPaginatedResponse(
    productReleases.map((release) => this.toResponse(release)),
    page,
    limit,
    total,
  );

  } catch (error) {

    console.error(error);

    throw error;

  }
}


  async findOne(id: string): Promise<ProductReleaseResponseDto> {
  const release = await this.prisma.productRelease.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      variant: {
        include: {
          figure: {
            include: {
              character: true,
              line: {
                include: {
                  manufacturer: true,
                  franchise: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!release || release.variant.deletedAt || release.variant.figure.deletedAt || release.variant.figure.character.deletedAt || release.variant.figure.line.deletedAt || release.variant.figure.line.manufacturer.deletedAt || release.variant.figure.line.franchise.deletedAt) {
    throw new NotFoundException(`Product Release with id '${id}' not found.`);
  }
  return this.toResponse(release);
}

  async create(createDto: CreateProductReleaseDto) {
    await this.ensureVariantExists(createDto.variantId);

    const result = await this.prisma.productRelease.create({
      data: createDto,
      select: { id: true },
    });
    return this.findOne(result.id);
  }

  async update(
    id: string,
    updateDto: UpdateProductReleaseDto,
  ) {
    if (updateDto.variantId) {
      await this.ensureVariantExists(updateDto.variantId);
    }

    const result = await this.prisma.productRelease.update({
      where: {
        id,
      },
      data: updateDto,
      select: { id: true },
    });
    return this.findOne(result.id);
  }

  remove(id: string) {
    return this.prisma.productRelease.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: { id: true, deletedAt: true },
    });
  }

  private toResponse(release: any): ProductReleaseResponseDto {
    return {
      id: release.id,
      name: release.name,
      barcode: release.barcode,
      releaseYear: release.releaseDate?.getUTCFullYear() ?? null,
      releaseDate: release.releaseDate?.toISOString() ?? null,
      packagingType: release.packagingType,
      region: release.region,
      language: release.language,
      retailer: release.retailer,
      notes: release.notes,
      imageUrl: release.imageUrl,
      variant: {
        id: release.variant.id,
        name: release.variant.name,
        figure: {
          id: release.variant.figure.id,
          name: release.variant.figure.name,
          code: release.variant.figure.code,
          imageUrl: release.variant.figure.imageUrl,
          character: {
            id: release.variant.figure.character.id,
            name: release.variant.figure.character.name,
            image: release.variant.figure.character.image,
          },
          line: {
            id: release.variant.figure.line.id,
            name: release.variant.figure.line.name,
            manufacturer: {
              id: release.variant.figure.line.manufacturer.id,
              name: release.variant.figure.line.manufacturer.name,
            },
          },
        },
      },
    };
  }

  private async ensureVariantExists(id: string) {
    const variant = await this.prisma.variant.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!variant) {
      throw new NotFoundException(
        `Variant with id '${id}' not found.`,
      );
    }
  }
}
