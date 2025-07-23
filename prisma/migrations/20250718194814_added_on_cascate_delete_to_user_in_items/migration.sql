-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_userId_fkey";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
