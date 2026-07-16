/*
  Warnings:

  - A unique constraint covering the columns `[manufacturerId,name]` on the table `Line` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Line" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Line_manufacturerId_name_key" ON "Line"("manufacturerId", "name");
