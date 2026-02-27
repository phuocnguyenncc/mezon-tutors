import { Injectable } from '@nestjs/common';
import type { User } from '@mezon-tutors/db';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByMezonUserId(mezonUserId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { mezonUserId },
    });
  }

  async upsertFromMezon(params: {
    mezonUserId: string;
    username: string;
    avatar?: string | null;
  }): Promise<User> {
    const { mezonUserId, username, avatar } = params;

    const existing = await this.findByMezonUserId(mezonUserId);
    if (existing) {
      return this.prisma.user.update({
        where: { mezonUserId },
        data: {
          username,
          avatar: avatar ?? existing.avatar,
        },
      });
    }

    return this.prisma.user.create({
      data: {
        mezonUserId,
        username,
        avatar: avatar ?? '',
        role: 'student',
      },
    });
  }
}

