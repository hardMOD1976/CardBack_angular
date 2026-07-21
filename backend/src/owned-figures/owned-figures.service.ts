import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateOwnedFigureDto } from './dto/create-owned-figure.dto';
import { UpdateOwnedFigureDto } from './dto/update-owned-figure.dto';

@Injectable()
export class OwnedFiguresService {
  constructor(private prisma: PrismaService) {}

  async ensureUserExists(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id '${id}' not found.`,
      );
    }
  }

  async ensureProductReleaseExists(id: string) {
    const release = await this.prisma.productRelease.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!release) {
      throw new NotFoundException(
        `Product Release with id '${id}' not found.`,
      );
    }
  }

  findAll() {
    return this.prisma.ownedFigure.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        user: true,
        productRelease: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.ownedFigure.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        user: true,
        productRelease: true,
      },
    });
  }

  async create(dto: CreateOwnedFigureDto) {
    await this.ensureUserExists(dto.userId);
    await this.ensureProductReleaseExists(dto.productReleaseId);

    return this.prisma.ownedFigure.create({
      data: dto,
    });
  }

  async update(
    id: string,
    dto: UpdateOwnedFigureDto,
  ) {
    if (dto.userId) {
      await this.ensureUserExists(dto.userId);
    }

    if (dto.productReleaseId) {
      await this.ensureProductReleaseExists(dto.productReleaseId);
    }

    return this.prisma.ownedFigure.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.ownedFigure.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}