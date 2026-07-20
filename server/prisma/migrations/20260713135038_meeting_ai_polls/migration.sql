/*
  Warnings:

  - You are about to drop the column `entity` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `createdByAI` on the `MeetingSummary` table. All the data in the column will be lost.
  - You are about to drop the column `keyPoints` on the `MeetingSummary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[meetingId]` on the table `MeetingSummary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `MeetingSummary` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SummaryStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- DropIndex
DROP INDEX "AuditLog_userId_idx";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "entity",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "entityType" TEXT,
ADD COLUMN     "performedById" INTEGER,
ALTER COLUMN "entityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CommitteeMeeting" ADD COLUMN     "aiSummaryStatus" "SummaryStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "MeetingSummary" DROP COLUMN "createdByAI",
DROP COLUMN "keyPoints",
ADD COLUMN     "generatedByAI" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nextSteps" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleAccessToken" TEXT,
ADD COLUMN     "googleRefreshToken" TEXT,
ADD COLUMN     "googleTokenExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_performedById_idx" ON "AuditLog"("performedById");

-- CreateIndex
CREATE UNIQUE INDEX "MeetingSummary_meetingId_key" ON "MeetingSummary"("meetingId");
