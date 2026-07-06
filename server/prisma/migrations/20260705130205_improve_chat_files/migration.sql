-- CreateEnum
CREATE TYPE "FileCategory" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO', 'OTHER');

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "fileExtension" TEXT,
ADD COLUMN     "isCompressed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mimeCategory" "FileCategory",
ADD COLUMN     "thumbnailUrl" TEXT;
