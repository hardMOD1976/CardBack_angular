import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { GlobalSearchQueryDto } from './dto/global-search-query.dto';
import {
  GlobalSearchContextDto,
  GlobalSearchResultDto,
  GlobalSearchResultType,
} from './dto/global-search-result.dto';

import { buildPaginatedResponse } from '../common/pagination';

@Injectable()
export class GlobalSearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(
    query: GlobalSearchQueryDto,
  ) {
    const {
      q,
      page,
      limit,
    } = query;

    const search = q.trim();

    if (!search) {
      return buildPaginatedResponse(
        [],
        page,
        limit,
        0,
      );
    }

    const [
      franchises,
      manufacturers,
      lines,
      characters,
      figures,
      variants,
      productReleases,
    ] = await Promise.all([
      this.prisma.franchise.findMany({
        where: {
          deletedAt: null,
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.manufacturer.findMany({
        where: {
          deletedAt: null,
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.line.findMany({
        where: {
          deletedAt: null,
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        include: {
          manufacturer: true,
          franchise: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.character.findMany({
        where: {
          deletedAt: null,
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        include: {
          franchise: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.figure.findMany({
        where: {
          deletedAt: null,
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              code: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
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
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.variant.findMany({
        where: {
          deletedAt: null,
          name: {
            contains: search,
            mode: 'insensitive',
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
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.productRelease.findMany({
        where: {
          deletedAt: null,
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              barcode: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          variant: {
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
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    const results: GlobalSearchResultDto[] = [
      ...franchises.map((franchise) =>
        this.createResult({
          id: franchise.id,
          type: 'franchise',
          name: franchise.name,
          imageUrl: franchise.logo,
          context: {},
        }),
      ),

      ...manufacturers.map((manufacturer) =>
        this.createResult({
          id: manufacturer.id,
          type: 'manufacturer',
          name: manufacturer.name,
          imageUrl: null,
          context: {},
        }),
      ),

      ...lines.map((line) =>
        this.createResult({
          id: line.id,
          type: 'line',
          name: line.name,
          imageUrl: line.logo,
          context: {
            franchise: line.franchise.name,
            manufacturer: line.manufacturer.name,
          },
        }),
      ),

      ...characters.map((character) =>
        this.createResult({
          id: character.id,
          type: 'character',
          name: character.name,
          imageUrl: character.image,
          context: {
            franchise: character.franchise.name,
          },
        }),
      ),

      ...figures.map((figure) =>
        this.createResult({
          id: figure.id,
          type: 'figure',
          name: figure.name,
          imageUrl: figure.imageUrl,
          context: {
            franchise: figure.character.franchise.name,
            manufacturer: figure.line.manufacturer.name,
            line: figure.line.name,
            character: figure.character.name,
          },
        }),
      ),

      ...variants.map((variant) =>
        this.createResult({
          id: variant.id,
          type: 'variant',
          name: variant.name ?? '',
          imageUrl: variant.imageUrl,
          context: {
            franchise:
              variant.figure.character.franchise.name,
            manufacturer:
              variant.figure.line.manufacturer.name,
            line: variant.figure.line.name,
            character: variant.figure.character.name,
            figure: variant.figure.name,
          },
        }),
      ),

      ...productReleases.map((productRelease) =>
        this.createResult({
          id: productRelease.id,
          type: 'productRelease',
          name: productRelease.name,
          imageUrl: productRelease.imageUrl,
          context: {
            franchise:
              productRelease.variant.figure.character.franchise.name,
            manufacturer:
              productRelease.variant.figure.line.manufacturer.name,
            line:
              productRelease.variant.figure.line.name,
            character:
              productRelease.variant.figure.character.name,
            figure:
              productRelease.variant.figure.name,
            variant:
              productRelease.variant.name ?? undefined,
          },
        }),
      ),
    ];

    const sortedResults = this.sortResults(
      results,
      search,
    );

    const total = sortedResults.length;

    const skip = (page - 1) * limit;

    const paginatedResults = sortedResults.slice(
      skip,
      skip + limit,
    );

    return buildPaginatedResponse(
      paginatedResults,
      page,
      limit,
      total,
    );
  }

  private createResult(params: {
    id: string;
    type: GlobalSearchResultType;
    name: string;
    imageUrl: string | null;
    context: GlobalSearchContextDto;
  }): GlobalSearchResultDto {
    return {
      id: params.id,
      type: params.type,
      name: params.name,
      imageUrl: params.imageUrl,
      context: params.context,
    };
  }

  private sortResults(
    results: GlobalSearchResultDto[],
    search: string,
  ): GlobalSearchResultDto[] {
    const normalizedSearch = search.toLocaleLowerCase();

    const typePriority: Record<
      GlobalSearchResultType,
      number
    > = {
      character: 1,
      figure: 2,
      variant: 3,
      productRelease: 4,
      line: 5,
      franchise: 6,
      manufacturer: 7,
    };

    return [...results].sort((a, b) => {
      const aName = a.name.toLocaleLowerCase();
      const bName = b.name.toLocaleLowerCase();

      const aExact = aName === normalizedSearch ? 0 : 1;
      const bExact = bName === normalizedSearch ? 0 : 1;

      if (aExact !== bExact) {
        return aExact - bExact;
      }

      const aStartsWith = aName.startsWith(
        normalizedSearch,
      )
        ? 0
        : 1;

      const bStartsWith = bName.startsWith(
        normalizedSearch,
      )
        ? 0
        : 1;

      if (aStartsWith !== bStartsWith) {
        return aStartsWith - bStartsWith;
      }

      const typeComparison =
        typePriority[a.type] -
        typePriority[b.type];

      if (typeComparison !== 0) {
        return typeComparison;
      }

      return aName.localeCompare(
        bName,
        undefined,
        {
          sensitivity: 'base',
        },
      );
    });
  }
}