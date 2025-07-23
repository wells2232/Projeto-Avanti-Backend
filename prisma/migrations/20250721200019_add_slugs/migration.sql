/*
  Warnings:

  - You are about to drop the column `category_name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `ItemConditions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ItemConditions` table. All the data in the column will be lost.
  - You are about to drop the column `status_name` on the `ItemStatuses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ItemConditions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ItemConditions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ItemStatuses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ItemStatuses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ItemConditions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ItemConditions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ItemStatuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ItemStatuses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_category_name_key";

-- DropIndex
DROP INDEX "ItemConditions_condition_key";

-- DropIndex
DROP INDEX "ItemStatuses_status_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "category_name",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ItemConditions" DROP COLUMN "condition",
DROP COLUMN "description",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ItemStatuses" DROP COLUMN "status_name",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ItemConditions_name_key" ON "ItemConditions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemConditions_slug_key" ON "ItemConditions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatuses_name_key" ON "ItemStatuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatuses_slug_key" ON "ItemStatuses"("slug");
