-- DropIndex
DROP INDEX "OwnedFigure_userId_productReleaseId_key";

-- AlterTable
ALTER TABLE "OwnedFigure" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
