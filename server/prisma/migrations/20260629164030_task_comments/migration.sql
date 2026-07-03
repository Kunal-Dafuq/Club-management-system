/*
  Warnings:

  - You are about to drop the column `parentId` on the `TaskComment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskComment" DROP CONSTRAINT "TaskComment_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "TaskComment" DROP CONSTRAINT "TaskComment_parentId_fkey";

-- AlterTable
ALTER TABLE "TaskComment" DROP COLUMN "parentId";

-- CreateIndex
CREATE INDEX "TaskComment_taskId_idx" ON "TaskComment"("taskId");

-- AddForeignKey
ALTER TABLE "TaskComment" ADD CONSTRAINT "TaskComment_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
