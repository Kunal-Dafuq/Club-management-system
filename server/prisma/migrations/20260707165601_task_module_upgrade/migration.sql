/*
  Warnings:

  - You are about to drop the column `deliveredAt` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `readAt` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TaskAttachment` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `TaskAttachment` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedById` on the `TaskAttachment` table. All the data in the column will be lost.
  - You are about to drop the `ChatLastRead` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fileType` to the `TaskAttachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membershipId` to the `TaskAttachment` table without a default value. This is not possible if the table is not empty.
  - Made the column `fileSize` on table `TaskAttachment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChatLastRead" DROP CONSTRAINT "ChatLastRead_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "ChatLastRead" DROP CONSTRAINT "ChatLastRead_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TaskAttachment" DROP CONSTRAINT "TaskAttachment_uploadedById_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "deliveredAt",
DROP COLUMN "readAt";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "clubId" INTEGER;

-- AlterTable
ALTER TABLE "TaskAttachment" DROP COLUMN "createdAt",
DROP COLUMN "mimeType",
DROP COLUMN "uploadedById",
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "membershipId" INTEGER NOT NULL,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fileSize" SET NOT NULL,
ALTER COLUMN "fileSize" SET DATA TYPE BIGINT;

-- DropTable
DROP TABLE "ChatLastRead";

-- CreateIndex
CREATE INDEX "TaskAttachment_taskId_idx" ON "TaskAttachment"("taskId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAttachment" ADD CONSTRAINT "TaskAttachment_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
