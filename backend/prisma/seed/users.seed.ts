import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

export async function getUsers() {
  const saltRounds = 10;

  return [
    {
      username: 'isaacnegrie',
      displayName: 'Isaac Negrie',
      email: 'isaac@example.com',
      passwordHash: await bcrypt.hash('password123', saltRounds),
      country: 'Spain',
      avatar: null,
    },
    {
      username: 'johndoe',
      displayName: 'John Doe',
      email: 'john@example.com',
      passwordHash: await bcrypt.hash(
        'thepasswordispassowrd',
        saltRounds,
      ),
      country: 'United States',
      avatar: null,
    },
    {
      username: 'lukecollector',
      displayName: 'Luke Collector',
      email: 'luke@example.com',
      passwordHash: await bcrypt.hash('klingon', saltRounds),
      country: 'United Kingdom',
      avatar: null,
    },
    {
      username: 'retrofan',
      displayName: 'Retro Fan',
      email: 'retro@example.com',
      passwordHash: await bcrypt.hash(
        'eternia2026',
        saltRounds,
      ),
      role: Role.ADMIN,
      country: 'France',
      avatar: null,
    },
  ];
}