import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
  return this.prisma.manufacturer.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

// TEST watcher

  findOne(id: string) {
  return this.prisma.manufacturer.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
}

async create(createManufacturerDto: CreateManufacturerDto) {
  return this.prisma.manufacturer.create({
    data: createManufacturerDto,
  });
}

async update(
  id: string,
  updateManufacturerDto: UpdateManufacturerDto,
) {
  return this.prisma.manufacturer.update({
    where: {
      id,
    },
    data: updateManufacturerDto,
  });
}

async remove(id: string) {
  return this.prisma.manufacturer.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

}