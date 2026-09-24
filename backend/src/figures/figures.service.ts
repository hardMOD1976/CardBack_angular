import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateFigureDto } from './dto/create-figure.dto';

import { UpdateFigureDto } from './dto/update-figure.dto';

import { FigureDetailResponseDto } from './dto/figure-detail-response.dto';

import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class FiguresService {

  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: PaginationQueryDto,
  ) {

    const { page, limit, search } = pagination;

    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
      character: { deletedAt: null, franchise: { deletedAt: null } },
      line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } },
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }),
    };

    const [figures, total] =
      await this.prisma.$transaction([
        this.prisma.figure.findMany({
          where,
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
          skip,
          take: limit,
        }),
        this.prisma.figure.count({
          where,
        }),
      ]);

    return buildPaginatedResponse(
      figures.map((figure) => ({
        id: figure.id, name: figure.name, code: figure.code, description: figure.description, imageUrl: figure.imageUrl,
        character: { id: figure.character.id, name: figure.character.name, image: figure.character.image },
        line: {
          id: figure.line.id, name: figure.line.name, scale: figure.line.scale, logo: figure.line.logo,
          manufacturer: { id: figure.line.manufacturer.id, name: figure.line.manufacturer.name },
          franchise: { id: figure.line.franchise.id, name: figure.line.franchise.name },
        },
      })),
      page,
      limit,
      total,
    );
  }

  async findDetail(
    id: string,
  ): Promise<FigureDetailResponseDto> {

    const figure = await this.prisma.figure.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        character: { include: { franchise: true } },
        line: { include: { manufacturer: true, franchise: true } },
        variants: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            name: 'asc',
          },
          include: {
            productReleases: { where: { deletedAt: null }, orderBy: { name: 'asc' } },
          },
        },
      },
    });

    if (
      !figure ||
      figure.character.deletedAt !== null ||
      figure.character.franchise.deletedAt !== null ||
      figure.line.deletedAt !== null ||
      figure.line.manufacturer.deletedAt !== null ||
      figure.line.franchise.deletedAt !== null
    ) {
      throw new NotFoundException(
        `Figure with id '${id}' not found.`,
      );
    }

    return {
      id: figure.id,
      name: figure.name,
      code: figure.code,
      description: figure.description,
      imageUrl: figure.imageUrl,

      character: {
        id: figure.character.id,
        name: figure.character.name,
        image: figure.character.image,
      },

      line: {
        id: figure.line.id,
        name: figure.line.name,
        scale: figure.line.scale,
        logo: figure.line.logo,
        manufacturer: { id: figure.line.manufacturer.id, name: figure.line.manufacturer.name },
        franchise: { id: figure.line.franchise.id, name: figure.line.franchise.name },
      },

      variants: figure.variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        description: variant.description,
        imageUrl: variant.imageUrl,
        productReleases: variant.productReleases.map((release) => ({
          id: release.id,
          name: release.name,
          packagingType: release.packagingType,
          region: release.region,
          releaseDate: release.releaseDate?.toISOString() ?? null,
          barcode: release.barcode,
          imageUrl: release.imageUrl,
        })),
      })),
    };
  }

  async create(createFigureDto: CreateFigureDto) {

    await this.ensureCharacterExists(
      createFigureDto.characterId,
    );

    await this.ensureLineExists(
      createFigureDto.lineId,
    );

    return this.prisma.figure.create({
      data: createFigureDto,
      select: { id: true, name: true, code: true, description: true, imageUrl: true, characterId: true, lineId: true },
    });
  }

  async update(
    id: string,
    updateFigureDto: UpdateFigureDto,
  ) {

    if (updateFigureDto.characterId) {
      await this.ensureCharacterExists(
        updateFigureDto.characterId,
      );
    }

    if (updateFigureDto.lineId) {
      await this.ensureLineExists(
        updateFigureDto.lineId,
      );
    }

    return this.prisma.figure.update({
      where: {
        id,
      },
      data: updateFigureDto,
      select: { id: true, name: true, code: true, description: true, imageUrl: true, characterId: true, lineId: true },
    });
  }

  remove(id: string) {

    return this.prisma.figure.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: { id: true, deletedAt: true },
    });
  }

  private async ensureCharacterExists(
    characterId: string,
  ) {

    const character =
      await this.prisma.character.findFirst({
        where: {
          id: characterId,
          deletedAt: null,
        },
      });

    if (!character) {
      throw new NotFoundException(
        `Character with id '${characterId}' not found.`,
      );
    }
  }

  private async ensureLineExists(
    lineId: string,
  ) {

    const line =
      await this.prisma.line.findFirst({
        where: {
          id: lineId,
          deletedAt: null,
        },
      });

    if (!line) {
      throw new NotFoundException(
        `Line with id '${lineId}' not found.`,
      );
    }
  }
}
