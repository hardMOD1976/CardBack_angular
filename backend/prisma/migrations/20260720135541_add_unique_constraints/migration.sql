/*
  Warnings:

  - A unique constraint covering the columns `[franchiseId,name]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lineId,characterId,name]` on the table `Figure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Franchise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variantId,name]` on the table `ProductRelease` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[figureId,name]` on the table `Variant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_franchiseId_name_key" ON "Character"("franchiseId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Figure_lineId_characterId_name_key" ON "Figure"("lineId", "characterId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRelease_variantId_name_key" ON "ProductRelease"("variantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_figureId_name_key" ON "Variant"("figureId", "name");
