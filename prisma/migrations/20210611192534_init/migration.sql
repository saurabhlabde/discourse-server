-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "createdAtIso" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "room" ADD COLUMN     "createdAtIso" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "createdAtIso" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAtIso" TEXT NOT NULL DEFAULT E'';
