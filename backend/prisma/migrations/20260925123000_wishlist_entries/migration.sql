CREATE TABLE "WishlistEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productReleaseId" TEXT NOT NULL,
    "targetPrice" DECIMAL(65,30),
    "notes" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "WishlistEntry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WishlistEntry_userId_productReleaseId_key" ON "WishlistEntry"("userId", "productReleaseId");
CREATE INDEX "WishlistEntry_userId_deletedAt_idx" ON "WishlistEntry"("userId", "deletedAt");
CREATE INDEX "WishlistEntry_productReleaseId_idx" ON "WishlistEntry"("productReleaseId");

ALTER TABLE "WishlistEntry" ADD CONSTRAINT "WishlistEntry_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WishlistEntry" ADD CONSTRAINT "WishlistEntry_productReleaseId_fkey"
FOREIGN KEY ("productReleaseId") REFERENCES "ProductRelease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
