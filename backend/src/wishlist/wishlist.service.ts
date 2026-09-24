import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistEntryDto } from './dto/create-wishlist-entry.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    const entries = await this.prisma.wishlistEntry.findMany({
      where: {
        userId, deletedAt: null,
        productRelease: {
          deletedAt: null,
          variant: { deletedAt: null, figure: { deletedAt: null, character: { deletedAt: null, franchise: { deletedAt: null } }, line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } } } },
        },
      },
      include: this.entryInclude(),
      orderBy: { createdAt: 'desc' },
    });
    return entries.map((entry) => this.toResponse(entry));
  }

  async create(userId: string, dto: CreateWishlistEntryDto) {
    const release = await this.prisma.productRelease.findFirst({
      where: {
        id: dto.productReleaseId, deletedAt: null,
        variant: { deletedAt: null, figure: { deletedAt: null, character: { deletedAt: null, franchise: { deletedAt: null } }, line: { deletedAt: null, manufacturer: { deletedAt: null }, franchise: { deletedAt: null } } } },
      },
      select: { id: true },
    });
    if (!release) throw new NotFoundException(`Product Release '${dto.productReleaseId}' not found.`);
    const existing = await this.prisma.wishlistEntry.findUnique({ where: { userId_productReleaseId: { userId, productReleaseId: dto.productReleaseId } }, select: { id: true, deletedAt: true } });
    if (existing) {
      if (existing.deletedAt) {
        await this.prisma.wishlistEntry.update({ where: { id: existing.id }, data: { deletedAt: null, targetPrice: dto.targetPrice, notes: dto.notes } });
      }
      const restored = await this.prisma.wishlistEntry.findUniqueOrThrow({ where: { id: existing.id }, include: this.entryInclude() });
      return this.toResponse(restored);
    }
    const created = await this.prisma.wishlistEntry.create({
      data: { userId, productReleaseId: dto.productReleaseId, targetPrice: dto.targetPrice, notes: dto.notes },
      include: this.entryInclude(),
    });
    return this.toResponse(created);
  }

  async remove(userId: string, id: string) {
    const result = await this.prisma.wishlistEntry.updateMany({ where: { id, userId, deletedAt: null }, data: { deletedAt: new Date() } });
    if (!result.count) throw new NotFoundException(`Wishlist entry '${id}' not found.`);
    return { id, removed: true };
  }

  private entryInclude() {
    return { productRelease: { include: { variant: { include: { figure: { include: { character: true, line: { include: { manufacturer: true } } } } } } } } } as const;
  }

  private toResponse(entry: any) {
    const release = entry.productRelease;
    const variant = release.variant;
    const figure = variant.figure;
    return {
      id: entry.id,
      targetPrice: entry.targetPrice?.toNumber() ?? null,
      notes: entry.notes,
      createdAt: entry.createdAt.toISOString(),
      productRelease: {
        id: release.id, name: release.name, packagingType: release.packagingType,
        region: release.region, releaseDate: release.releaseDate?.toISOString() ?? null,
        barcode: release.barcode, imageUrl: release.imageUrl,
        variant: { id: variant.id, name: variant.name, figure: {
          id: figure.id, name: figure.name, imageUrl: figure.imageUrl,
          character: { id: figure.character.id, name: figure.character.name },
          line: { id: figure.line.id, name: figure.line.name, manufacturer: { id: figure.line.manufacturer.id, name: figure.line.manufacturer.name } },
        } },
      },
    };
  }
}
