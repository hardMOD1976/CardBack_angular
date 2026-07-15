import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ManufacturersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.manufacturer.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.manufacturer.findUnique({
      where: {
        id,
      },
    });
  }
}