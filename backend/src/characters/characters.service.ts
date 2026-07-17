import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.character.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        franchise: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
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