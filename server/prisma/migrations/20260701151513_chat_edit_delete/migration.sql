/*
  Warnings:

  - You are about to drop the column `deletedForEveryone` on the `ChatMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "deletedForEveryone",
ADD COLUMN     "deletedForAll" BOOLEAN NOT NULL DEFAULT false;
