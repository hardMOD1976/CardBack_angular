import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import {
  PaginationQueryDto,
  buildPaginatedResponse,
} from '../common/pagination';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) { }

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

  const [characters, total] =
    await this.prisma.$transaction([
      this.prisma.character.findMany({
        where,
        select: {
          id: true, name: true, species: true, homeworld: true, affiliation: true,
          description: true, image: true, franchise: { select: { id: true, name: true } },
        },
        orderBy: {
          name: 'asc',
        },
        skip,
        take: limit,
      }),

      this.prisma.character.count({
        where,
      }),
    ]);

  return buildPaginatedResponse(
    characters,
    page,
    limit,
    total,
  );
}

  async findOne(id: string) {
    const character = await this.prisma.character.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        franchise: { select: { id: true, name: true, owner: true, logo: true, deletedAt: true } },
        figures: {
          where: { deletedAt: null, line: { deletedAt: null } },
          select: {
            id: true, name: true, code: true, imageUrl: true,
            line: { select: { id: true, name: true, startYear: true, endYear: true, deletedAt: true } },
            variants: { where: { deletedAt: null }, select: { id: true } },
          },
          orderBy: { name: 'asc' },
        },
      },
    });
    if (!character || character.franchise.deletedAt) throw new NotFoundException(`Character with id '${id}' not found.`);
    return {
      id: character.id,
      name: character.name,
      species: character.species,
      homeworld: character.homeworld,
      affiliation: character.affiliation,
      description: character.description,
      image: character.image,
      franchise: {
        id: character.franchise.id,
        name: character.franchise.name,
        owner: character.franchise.owner,
        logo: character.franchise.logo,
      },
      figures: character.figures.filter((figure) => !figure.line.deletedAt).map((figure) => ({
        id: figure.id, name: figure.name, code: figure.code, imageUrl: figure.imageUrl,
        line: { id: figure.line.id, name: figure.line.name, startYear: figure.line.startYear, endYear: figure.line.endYear },
        variantsCount: figure.variants.length,
      })),
    };
  }

  async create(createCharacterDto: CreateCharacterDto) {
    await this.ensureFranchiseExists(createCharacterDto.franchiseId);

    const created = await this.prisma.character.create({
      data: createCharacterDto,
      select: { id: true, name: true, species: true, homeworld: true, affiliation: true, description: true, image: true, franchiseId: true },
    });
    return created;
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    if (updateCharacterDto.franchiseId) await this.ensureFranchiseExists(updateCharacterDto.franchiseId);
    return this.prisma.character.update({
      where: { id },
      data: updateCharacterDto,
      select: { id: true, name: true, species: true, homeworld: true, affiliation: true, description: true, image: true, franchiseId: true },
    });
  }

  async remove(id: string) {
    return this.prisma.character.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: { id: true, deletedAt: true },
    });
  }

  private async ensureFranchiseExists(franchiseId: string) {
    const franchise = await this.prisma.franchise.findFirst({
      where: {
        id: franchiseId,
        deletedAt: null,
      },
    });

    if (!franchise) {
      throw new NotFoundException('Franchise not found.');
    }
  }
}
