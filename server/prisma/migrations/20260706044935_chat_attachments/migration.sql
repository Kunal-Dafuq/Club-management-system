/*
  Warnings:

  - You are about to drop the column `fileName` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `ChatMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatAttachment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "width" INTEGER;

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "fileName",
DROP COLUMN "fileSize",
DROP COLUMN "fileType",
DROP COLUMN "fileUrl";
