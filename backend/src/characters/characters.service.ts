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
        include: {
          franchise: true,
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

  findOne(id: string) {
    return this.prisma.character.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        franchise: true,
      },
    });
  }

  async create(createCharacterDto: CreateCharacterDto) {
    await this.ensureFranchiseExists(createCharacterDto.franchiseId);

    return this.prisma.character.create({
      data: createCharacterDto,
    });
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return this.prisma.character.update({
      where: { id },
      data: updateCharacterDto,
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