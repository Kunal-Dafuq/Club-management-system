/*
  Warnings:

  - You are about to drop the column `fileExtension` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `isCompressed` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `mimeCategory` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `ChatMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "fileExtension",
DROP COLUMN "isCompressed",
DROP COLUMN "mimeCategory",
DROP COLUMN "thumbnailUrl",
ALTER COLUMN "fileSize" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "ChatAttachment" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileExtension" TEXT,
    "fileSize" BIGINT NOT NULL,
    "mimeCategory" "FileCategory" NOT NULL,
    "thumbnailUrl" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatAttachment_messageId_idx" ON "ChatAttachment"("messageId");

-- AddForeignKey
ALTER TABLE "ChatAttachment" ADD CONSTRAINT "ChatAttachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
