-- DropForeignKey
ALTER TABLE "ChatReaction" DROP CONSTRAINT "ChatReaction_membershipId_fkey";

-- AlterTable
ALTER TABLE "ChatReaction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "ChatReaction" ADD CONSTRAINT "ChatReaction_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
