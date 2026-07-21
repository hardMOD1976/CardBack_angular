-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "foundedYear" INTEGER,
    "dissolvedYear" INTEGER,
    "country" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT,
    "firstAppearance" INTEGER,
    "description" TEXT,
    "logo" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Line" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "scale" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "manufacturerId" TEXT NOT NULL,
    "franchiseId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT,
    "homeworld" TEXT,
    "affiliation" TEXT,
    "description" TEXT,
    "image" TEXT,
    "franchiseId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Figure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "defaultImage" TEXT,
    "characterId" TEXT NOT NULL,
    "lineId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Figure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "defaultImage" TEXT,
    "figureId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRelease" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "packagingType" TEXT,
    "region" TEXT,
    "language" TEXT,
    "retailer" TEXT,
    "releaseDate" TIMESTAMP(3),
    "barcode" TEXT,
    "notes" TEXT,
    "defaultImage" TEXT,
    "variantId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductRelease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnedFigure" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productReleaseId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "completeness" TEXT NOT NULL,
    "packagingState" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "purchasePrice" DECIMAL(65,30),
    "currency" TEXT,
    "purchaseLocation" TEXT,
    "estimatedMarketValue" DECIMAL(65,30),
    "storageLocation" TEXT,
    "notes" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OwnedFigure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "email" TEXT,
    "country" TEXT,
    "avatar" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_name_key" ON "Manufacturer"("name");

-- CreateIndex
CREATE INDEX "Manufacturer_name_idx" ON "Manufacturer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");

-- CreateIndex
CREATE INDEX "Franchise_name_idx" ON "Franchise"("name");

-- CreateIndex
CREATE INDEX "Line_name_idx" ON "Line"("name");

-- CreateIndex
CREATE INDEX "Line_manufacturerId_idx" ON "Line"("manufacturerId");

-- CreateIndex
CREATE INDEX "Line_franchiseId_idx" ON "Line"("franchiseId");

-- CreateIndex
CREATE UNIQUE INDEX "Line_manufacturerId_name_key" ON "Line"("manufacturerId", "name");

-- CreateIndex
CREATE INDEX "Character_name_idx" ON "Character"("name");

-- CreateIndex
CREATE INDEX "Character_franchiseId_idx" ON "Character"("franchiseId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_franchiseId_name_key" ON "Character"("franchiseId", "name");

-- CreateIndex
CREATE INDEX "Figure_name_idx" ON "Figure"("name");

-- CreateIndex
CREATE INDEX "Figure_code_idx" ON "Figure"("code");

-- CreateIndex
CREATE INDEX "Figure_characterId_idx" ON "Figure"("characterId");

-- CreateIndex
CREATE INDEX "Figure_lineId_idx" ON "Figure"("lineId");

-- CreateIndex
CREATE UNIQUE INDEX "Figure_lineId_characterId_name_key" ON "Figure"("lineId", "characterId", "name");

-- CreateIndex
CREATE INDEX "Variant_figureId_idx" ON "Variant"("figureId");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_figureId_name_key" ON "Variant"("figureId", "name");

-- CreateIndex
CREATE INDEX "ProductRelease_variantId_idx" ON "ProductRelease"("variantId");

-- CreateIndex
CREATE INDEX "ProductRelease_barcode_idx" ON "ProductRelease"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRelease_variantId_name_key" ON "ProductRelease"("variantId", "name");

-- CreateIndex
CREATE INDEX "OwnedFigure_userId_idx" ON "OwnedFigure"("userId");

-- CreateIndex
CREATE INDEX "OwnedFigure_productReleaseId_idx" ON "OwnedFigure"("productReleaseId");

-- CreateIndex
CREATE UNIQUE INDEX "OwnedFigure_userId_productReleaseId_key" ON "OwnedFigure"("userId", "productReleaseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "Line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRelease" ADD CONSTRAINT "ProductRelease_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedFigure" ADD CONSTRAINT "OwnedFigure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedFigure" ADD CONSTRAINT "OwnedFigure_productReleaseId_fkey" FOREIGN KEY ("productReleaseId") REFERENCES "ProductRelease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
