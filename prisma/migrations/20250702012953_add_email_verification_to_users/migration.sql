/*
  Warnings:

  - A unique constraint covering the columns `[emailVerificationToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "emailVerificationTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Users_emailVerificationToken_key" ON "Users"("emailVerificationToken");
