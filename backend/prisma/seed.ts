import { PrismaClient } from '@prisma/client';
import { manufacturers } from './seed/manufacturers.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting FigureArchive seed...');

  for (const manufacturer of manufacturers) {
    await prisma.manufacturer.upsert({
      where: {
        name: manufacturer.name,
      },
      update: {
        foundedYear: manufacturer.foundedYear,
        dissolvedYear: manufacturer.dissolvedYear,
        country: manufacturer.country,
      },
      create: manufacturer,
    });
  }

  console.log(`✅ Seeded ${manufacturers.length} manufacturers`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });