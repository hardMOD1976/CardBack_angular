/*
  Warnings:

  - A unique constraint covering the columns `[collectorId,productReleaseId]` on the table `OwnedFigure` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OwnedFigure_collectorId_productReleaseId_key" ON "OwnedFigure"("collectorId", "productReleaseId");
