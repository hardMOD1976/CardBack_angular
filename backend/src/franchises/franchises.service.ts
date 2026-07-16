import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';

@Injectable()
export class FranchisesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.franchise.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.franchise.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  create(createFranchiseDto: CreateFranchiseDto) {
    return this.prisma.franchise.create({
      data: createFranchiseDto,
    });
  }

  update(
    id: string,
    updateFranchiseDto: UpdateFranchiseDto,
  ) {
    return this.prisma.franchise.update({
      where: {
        id,
      },
      data: updateFranchiseDto,
    });
  }

  remove(id: string) {
    return this.prisma.franchise.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}