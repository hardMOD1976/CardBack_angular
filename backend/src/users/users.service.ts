import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) {}

  findAll() {

    return this.prisma.user.findMany({

      where: {
        deletedAt: null,
      },

      orderBy: {
        username: 'asc',
      },
      select: { id: true, username: true, displayName: true, email: true, country: true, avatar: true, role: true, createdAt: true },

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

  findOnePublic(id: string) {
    return this.prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: { id: true, username: true, displayName: true, email: true, country: true, avatar: true, role: true, createdAt: true },
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

  // NOU MÈTODE

  async findByIdentifier(identifier: string) {

    return this.prisma.user.findFirst({

      where: {

        deletedAt: null,

        OR: [

          { username: { equals: identifier, mode: 'insensitive' } },
          { email: { equals: identifier, mode: 'insensitive' } },

        ],

      },

    });

  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' }, deletedAt: null },
    });
  }

  async createAccount(data: { username: string; displayName: string; email: string; passwordHash: string }) {
    return this.prisma.user.create({
      data: { ...data, role: 'USER' },
      select: { id: true, username: true, displayName: true, email: true, role: true },
    });
  }

  async updatePassword(userId: string, passwordHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash, refreshTokenHash: null },
      select: { id: true },
    });
  }

  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {

    return this.prisma.user.update({

      where: {
        id,
      },

      data: updateUserDto,
      select: { id: true, username: true, displayName: true, email: true, country: true, avatar: true, role: true, updatedAt: true },

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
      select: { id: true, deletedAt: true },

    });

  }

  async create(createUserDto: CreateUserDto) {

    return this.prisma.user.create({

      data: createUserDto,
      select: { id: true, username: true, displayName: true, email: true, country: true, avatar: true, role: true, createdAt: true },

    });

  }

}
