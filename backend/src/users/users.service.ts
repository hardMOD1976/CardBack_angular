import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        username: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
    });
  }

  // create(createUserDto: CreateUserDto) {
  //   return this.prisma.user.create({
  //     data: createUserDto,
  //   });
  // }

  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async updateRefreshToken(
  userId: string,
  refreshTokenHash: string | null,
) {
  return this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshTokenHash,
    },
  });
}

  remove(id: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}