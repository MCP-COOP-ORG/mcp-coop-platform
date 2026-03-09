/*
  Warnings:

  - Added the required column `language` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `CoopItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CoopItem" ADD COLUMN     "language" TEXT NOT NULL;
