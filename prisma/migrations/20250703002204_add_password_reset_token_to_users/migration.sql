/*
  Warnings:

  - A unique constraint covering the columns `[passwordResetToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "passwordResetTokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Users_passwordResetToken_key" ON "Users"("passwordResetToken");
