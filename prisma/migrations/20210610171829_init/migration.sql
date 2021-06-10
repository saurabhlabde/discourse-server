/*
  Warnings:

  - You are about to drop the `UserId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserId" DROP CONSTRAINT "UserId_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UserId" DROP CONSTRAINT "UserId_userId_fkey";

-- DropTable
DROP TABLE "UserId";

-- CreateTable
CREATE TABLE "userId" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userId" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userId" ADD FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
