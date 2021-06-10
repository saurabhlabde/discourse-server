-- AlterTable
ALTER TABLE "room" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "room" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
