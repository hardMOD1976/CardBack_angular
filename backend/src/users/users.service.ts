
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        username: 'asc',
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        country: true,
        avatar: true,
        role: true,
        createdAt: true,
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

  findOnePublic(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        country: true,
        avatar: true,
        role: true,
        createdAt: true,
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

  async findByIdentifier(identifier: string) {
    return this.prisma.user.findFirst({
      where: {
        deletedAt: null,
        OR: [
          {
            username: {
              equals: identifier,
              mode: 'insensitive',
            },
          },
          {
            email: {
              equals: identifier,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
    });
  }

  async createAccount(data: {
    username: string;
    displayName: string;
    email: string;
    passwordHash: string;
  }) {
    return this.prisma.user.create({
      data: {
        ...data,
        role: Role.USER,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        role: true,
      },
    });
  }

  async updatePassword(
    userId: string,
    passwordHash: string,
  ) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
        refreshTokenHash: null,
      },
      select: {
        id: true,
      },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    const {
      username,
      displayName,
      email,
      country,
      avatar,
    } = updateUserDto;

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username:
          username === undefined ? undefined : username.trim(),
        displayName:
          displayName === undefined
            ? undefined
            : displayName.trim(),
        email:
          email === undefined
            ? undefined
            : email.trim().toLowerCase(),
        country,
        avatar,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        country: true,
        avatar: true,
        role: true,
        updatedAt: true,
      },
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

  async remove(id: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    if (existingUser.role === Role.ADMIN) {
      throw new ForbiddenException(
        'The administrator account cannot be archived.',
      );
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        deletedAt: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const {
      username,
      displayName,
      email,
      password,
      country,
      avatar,
    } = createUserDto;

    const passwordHash = await bcrypt.hash(password, 12);

    return this.prisma.user.create({
      data: {
        username: username.trim(),
        displayName: displayName?.trim(),
        email: email?.trim().toLowerCase(),
        passwordHash,
        role: Role.USER,
        country,
        avatar,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        country: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
