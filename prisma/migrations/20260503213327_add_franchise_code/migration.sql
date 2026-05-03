/*
  Warnings:

  - Added the required column `code` to the `Franchise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketCode` to the `Intervention` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketNumber` to the `Intervention` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Franchise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_Franchise" ("id", "name") SELECT "id", "name" FROM "Franchise";
DROP TABLE "Franchise";
ALTER TABLE "new_Franchise" RENAME TO "Franchise";
CREATE TABLE "new_Intervention" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ticketNumber" INTEGER NOT NULL,
    "ticketCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "resolvedAt" DATETIME,
    "siteId" INTEGER NOT NULL,
    CONSTRAINT "Intervention_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Intervention" ("date", "description", "id", "resolvedAt", "siteId", "title") SELECT "date", "description", "id", "resolvedAt", "siteId", "title" FROM "Intervention";
DROP TABLE "Intervention";
ALTER TABLE "new_Intervention" RENAME TO "Intervention";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
