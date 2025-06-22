/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `ItemCategory` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[itemId,categoryId]` on the table `ItemCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `ItemCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_categoriesId_fkey";

-- DropIndex
DROP INDEX "ItemCategory_itemId_categoriesId_key";

-- AlterTable
ALTER TABLE "ItemCategory" DROP COLUMN "categoriesId",
ADD COLUMN     "categoryId" UUID NOT NULL;

-- DropTable
DROP TABLE "Categories";

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemCategory_itemId_categoryId_key" ON "ItemCategory"("itemId", "categoryId");

-- AddForeignKey
ALTER TABLE "ItemCategory" ADD CONSTRAINT "ItemCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
