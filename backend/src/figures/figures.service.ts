import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';

@Injectable()
export class FiguresService {
  constructor(private prisma: PrismaService) {}

  findAll() {
  return this.prisma.figure.findMany({
    where: {
      deletedAt: null,
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
  });
}

findOne(id: string) {
  return this.prisma.figure.findFirst({
    where: {
      id,
      deletedAt: null,
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
  });
}

async create(createFigureDto: CreateFigureDto) {
  await this.ensureCharacterExists(createFigureDto.characterId);
  await this.ensureLineExists(createFigureDto.lineId);

  return this.prisma.figure.create({
    data: createFigureDto,
  });
}

async update(
  id: string,
  updateFigureDto: UpdateFigureDto,
) {
  if (updateFigureDto.characterId) {
    await this.ensureCharacterExists(updateFigureDto.characterId);
  }

  if (updateFigureDto.lineId) {
    await this.ensureLineExists(updateFigureDto.lineId);
  }

  return this.prisma.figure.update({
    where: {
      id,
    },
    data: updateFigureDto,
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
  });
}

  private async ensureCharacterExists(characterId: string) {
  const character = await this.prisma.character.findFirst({
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

private async ensureLineExists(lineId: string) {
  const line = await this.prisma.line.findFirst({
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