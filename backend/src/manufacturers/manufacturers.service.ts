import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

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

async create(createManufacturerDto: CreateManufacturerDto) {
  return this.prisma.manufacturer.create({
    data: createManufacturerDto,
  });
}

}