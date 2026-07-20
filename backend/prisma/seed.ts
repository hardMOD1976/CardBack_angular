import { PrismaClient } from '@prisma/client';

import { manufacturers } from './seed/manufacturers.seed';
import { franchises } from './seed/franchises.seed';
import { lines } from './seed/lines.seed';
import { characters } from './seed/characters.seed';
import { figures } from './seed/figures.seed';
import { variants } from './seed/variants.seed';
import { productReleases } from './seed/product-releases.seed';
import { collectors } from './seed/collectors.seed';
import { ownedFigures } from './seed/owned-figures.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting FigureArchive seed...');

  // ============================================================
  // Manufacturers
  // ============================================================

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

  // ============================================================
  // Franchises
  // ============================================================

  for (const franchise of franchises) {
    await prisma.franchise.upsert({
      where: {
        name: franchise.name,
      },
      update: {
        owner: franchise.owner,
        firstAppearance: franchise.firstAppearance,
        description: franchise.description,
        logo: franchise.logo,
      },
      create: franchise,
    });
  }

  console.log(`✅ Seeded ${franchises.length} franchises`);

  // ============================================================
  // Lines
  // ============================================================

  for (const line of lines) {
    const manufacturer = await prisma.manufacturer.findUniqueOrThrow({
      where: {
        name: line.manufacturerName,
      },
    });

    const franchise = await prisma.franchise.findUniqueOrThrow({
      where: {
        name: line.franchiseName,
      },
    });

    await prisma.line.upsert({
      where: {
        manufacturerId_name: {
          manufacturerId: manufacturer.id,
          name: line.name,
        },
      },
      update: {
        startYear: line.startYear,
        endYear: line.endYear,
        scale: line.scale,
        logo: line.logo,
        description: line.description,
        franchiseId: franchise.id,
      },
      create: {
        name: line.name,
        startYear: line.startYear,
        endYear: line.endYear,
        scale: line.scale,
        logo: line.logo,
        description: line.description,
        manufacturerId: manufacturer.id,
        franchiseId: franchise.id,
      },
    });
  }

  console.log(`✅ Seeded ${lines.length} lines`);

  // ============================================================
  // Characters
  // ============================================================

  for (const character of characters) {
    const franchise = await prisma.franchise.findUniqueOrThrow({
      where: {
        name: character.franchiseName,
      },
    });

    await prisma.character.create({
      data: {
        name: character.name,
        species: character.species,
        homeworld: character.homeworld,
        affiliation: character.affiliation,
        description: character.description,
        image: character.image,
        franchiseId: franchise.id,
      },
    });
  }

  console.log(`✅ Seeded ${characters.length} characters`);

  // ============================================================
  // Figures
  // ============================================================

  for (const figure of figures) {
    const character = await prisma.character.findFirstOrThrow({
      where: {
        name: figure.characterName,
      },
    });

    const line = await prisma.line.findFirstOrThrow({
      where: {
        name: figure.lineName,
      },
    });

    await prisma.figure.create({
      data: {
        name: figure.name,
        code: figure.code,
        description: figure.description,
        defaultImage: figure.defaultImage,
        characterId: character.id,
        lineId: line.id,
      },
    });
  }

  console.log(`✅ Seeded ${figures.length} figures`);

  // ============================================================
  // Variants
  // ============================================================

  for (const variant of variants) {
    const figure = await prisma.figure.findFirstOrThrow({
      where: {
        name: variant.figureName,
      },
    });

    await prisma.variant.create({
      data: {
        name: variant.name,
        description: variant.description,
        defaultImage: variant.defaultImage,
        figureId: figure.id,
      },
    });
  }

  console.log(`✅ Seeded ${variants.length} variants`);

  // ============================================================
  // Product Releases
  // ============================================================

  for (const release of productReleases) {
    const variant = await prisma.variant.findFirstOrThrow({
      where: {
        name: release.variantName,
      },
    });

    await prisma.productRelease.create({
      data: {
        name: release.name,
        packagingType: release.packagingType,
        region: release.region,
        language: release.language,
        retailer: release.retailer,
        releaseDate: release.releaseDate
          ? new Date(release.releaseDate)
          : null,
        barcode: release.barcode,
        notes: release.notes,
        defaultImage: release.defaultImage,
        variantId: variant.id,
      },
    });
  }

  console.log(`✅ Seeded ${productReleases.length} product releases`);

  // ============================================================
  // Collectors
  // ============================================================

  for (const collector of collectors) {
    await prisma.collector.upsert({
      where: {
        username: collector.username,
      },
      update: {
        displayName: collector.displayName,
        email: collector.email,
        country: collector.country,
        avatar: collector.avatar,
      },
      create: collector,
    });
  }

  console.log(`✅ Seeded ${collectors.length} collectors`);

  // ============================================================
  // Owned Figures
  // ============================================================

  for (const ownedFigure of ownedFigures) {
    const collector = await prisma.collector.findUniqueOrThrow({
      where: {
        username: ownedFigure.collectorUsername,
      },
    });

    const productRelease =
      await prisma.productRelease.findFirstOrThrow({
        where: {
          name: ownedFigure.productReleaseName,
        },
      });

    await prisma.ownedFigure.create({
      data: {
        collectorId: collector.id,
        productReleaseId: productRelease.id,

        condition: ownedFigure.condition,
        completeness: ownedFigure.completeness,
        packagingState: ownedFigure.packagingState,

        purchaseDate: ownedFigure.purchaseDate
          ? new Date(ownedFigure.purchaseDate)
          : null,

        purchasePrice: ownedFigure.purchasePrice,
        currency: ownedFigure.currency,
        purchaseLocation: ownedFigure.purchaseLocation,

        estimatedMarketValue:
          ownedFigure.estimatedMarketValue,

        storageLocation: ownedFigure.storageLocation,
        notes: ownedFigure.notes,
      },
    });
  }

  console.log(`✅ Seeded ${ownedFigures.length} owned figures`);

  console.log('🎉 FigureArchive seed completed successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });