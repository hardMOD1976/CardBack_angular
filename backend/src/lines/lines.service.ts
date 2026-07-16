import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLineDto } from './dto/create-lines.dto';
import { UpdateLineDto } from './dto/update-lines.dto';

@Injectable()
export class LinesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.line.findMany({
      include: {
        manufacturer: true,
        franchise: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.line.findUnique({
      where: { id },
      include: {
        manufacturer: true,
        franchise: true,
      },
    });
  }

  create(createLineDto: CreateLineDto) {
    return this.prisma.line.create({
      data: createLineDto,
    });
  }

  update(id: string, updateLineDto: UpdateLineDto) {
    return this.prisma.line.update({
      where: { id },
      data: updateLineDto,
    });
  }

  remove(id: string) {
    return this.prisma.line.delete({
      where: { id },
    });
  }
}