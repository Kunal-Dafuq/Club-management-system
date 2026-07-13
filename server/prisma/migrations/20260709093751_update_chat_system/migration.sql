/*
  Warnings:

  - You are about to drop the column `fileSize` on the `TaskAttachment` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `TaskAttachment` table. All the data in the column will be lost.
  - Added the required column `mimeType` to the `TaskAttachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `TaskAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatAttachment" ADD COLUMN     "blurHash" TEXT;

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastEditedById" INTEGER;

-- AlterTable
ALTER TABLE "TaskAttachment" DROP COLUMN "fileSize",
DROP COLUMN "fileType",
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TaskComment" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "TaskComment" ADD CONSTRAINT "TaskComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TaskComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
