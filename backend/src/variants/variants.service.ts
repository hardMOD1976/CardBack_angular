import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.variant.findMany({
      where: {
        deletedAt: null,
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
    });
  }

  findOne(id: string) {
    return this.prisma.variant.findFirst({
      where: {
        id,
        deletedAt: null,
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
    });
  }

  async create(createVariantDto: CreateVariantDto) {
    await this.ensureFigureExists(createVariantDto.figureId);

    return this.prisma.variant.create({
      data: createVariantDto,
    });
  }

  async update(
    id: string,
    updateVariantDto: UpdateVariantDto,
  ) {
    if (updateVariantDto.figureId) {
      await this.ensureFigureExists(updateVariantDto.figureId);
    }

    return this.prisma.variant.update({
      where: {
        id,
      },
      data: updateVariantDto,
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
    });
  }

  private async ensureFigureExists(figureId: string) {
    const figure = await this.prisma.figure.findFirst({
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