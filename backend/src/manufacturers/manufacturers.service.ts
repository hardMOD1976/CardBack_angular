import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ManufacturersService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.manufacturer.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

}