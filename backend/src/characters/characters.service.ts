import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

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

  create(createCharcterDto: CreateCharacterDto) {
    return this.prisma.character.create({
      data: createCharcterDto,
    });
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return this.prisma.character.update({
      where: { id },
      data: updateCharacterDto,
    });
  }

    remove(id: string) {
        return this.prisma.character.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}