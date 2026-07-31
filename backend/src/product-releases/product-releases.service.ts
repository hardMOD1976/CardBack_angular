import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProductReleaseDto } from './dto/create-product-release.dto';
import { UpdateProductReleaseDto } from './dto/update-product-release.dto';

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
    productReleases,
    page,
    limit,
    total,
  );

  } catch (error) {

    console.error(error);

    throw error;

  }
}


  findOne(id: string) {
  return this.prisma.productRelease.findFirst({
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
                },
              },
            },
          },
        },
      },
    },
  });
}

  async create(createDto: CreateProductReleaseDto) {
    await this.ensureVariantExists(createDto.variantId);

    return this.prisma.productRelease.create({
      data: createDto,
    });
  }

  async update(
    id: string,
    updateDto: UpdateProductReleaseDto,
  ) {
    if (updateDto.variantId) {
      await this.ensureVariantExists(updateDto.variantId);
    }

    return this.prisma.productRelease.update({
      where: {
        id,
      },
      data: updateDto,
    });
  }

  remove(id: string) {
    return this.prisma.productRelease.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
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