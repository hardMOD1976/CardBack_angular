import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProductReleaseDto } from './dto/create-product-release.dto';
import { UpdateProductReleaseDto } from './dto/update-product-release.dto';

@Injectable()
export class ProductReleasesService {
  constructor(private prisma: PrismaService) {}

  async ensureVariantExists(id: string) {
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

  findAll() {
    return this.prisma.productRelease.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        variant: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.productRelease.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        variant: true,
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
}