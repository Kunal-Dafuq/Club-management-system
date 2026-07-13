/*
  Warnings:

  - The values [GOING,MAYBE,NOT_GOING] on the enum `MeetingAttendanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdById` on the `CommitteeMeeting` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `organizerId` to the `CommitteeMeeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('GENERAL', 'CLUB', 'EVENT', 'RSVP', 'ANNOUNCEMENT', 'TASK', 'MEETING', 'CHAT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('SCHEDULED', 'LIVE', 'ENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MeetingProvider" AS ENUM ('GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS', 'JITSI', 'CUSTOM');

-- AlterEnum
BEGIN;
CREATE TYPE "MeetingAttendanceStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'ATTENDED', 'MISSED');
ALTER TABLE "public"."MeetingAttendance" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MeetingAttendance" ALTER COLUMN "status" TYPE "MeetingAttendanceStatus_new" USING ("status"::text::"MeetingAttendanceStatus_new");
ALTER TYPE "MeetingAttendanceStatus" RENAME TO "MeetingAttendanceStatus_old";
ALTER TYPE "MeetingAttendanceStatus_new" RENAME TO "MeetingAttendanceStatus";
DROP TYPE "public"."MeetingAttendanceStatus_old";
ALTER TABLE "MeetingAttendance" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "CommitteeMeeting" DROP CONSTRAINT "CommitteeMeeting_createdById_fkey";

-- DropIndex
DROP INDEX "Notification_userId_idx";

-- AlterTable
ALTER TABLE "ChatAttachment" ADD COLUMN     "bucket" TEXT,
ADD COLUMN     "objectKey" TEXT;

-- AlterTable
ALTER TABLE "CommitteeMeeting" DROP COLUMN "createdById",
ADD COLUMN     "agenda" TEXT,
ADD COLUMN     "calendarEventId" TEXT,
ADD COLUMN     "isInstant" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "meetingCode" TEXT,
ADD COLUMN     "meetingProvider" "MeetingProvider" NOT NULL DEFAULT 'GOOGLE_MEET',
ADD COLUMN     "organizerId" INTEGER NOT NULL,
ADD COLUMN     "status" "MeetingStatus" NOT NULL DEFAULT 'SCHEDULED',
ALTER COLUMN "endTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MeetingAttendance" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "joinedAt" TIMESTAMP(3),
ADD COLUMN     "leftAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "leftAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "createdById",
DROP COLUMN "link",
ADD COLUMN     "actionText" TEXT,
ADD COLUMN     "actionUrl" TEXT,
ADD COLUMN     "category" "NotificationCategory" NOT NULL,
ADD COLUMN     "clubId" INTEGER,
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "entityId" INTEGER,
ADD COLUMN     "entityType" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" "NotificationPriority" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "readAt" TIMESTAMP(3),
ADD COLUMN     "senderId" INTEGER,
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "TaskAttachment" ADD COLUMN     "bucket" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "objectKey" TEXT;

-- AlterTable
ALTER TABLE "TaskComment" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "MeetingSummary" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "transcript" TEXT,
    "actionItems" JSONB,
    "keyPoints" JSONB,
    "decisions" JSONB,
    "createdByAI" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingNote" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingRecording" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "recordingUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingRecording_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingAttachment" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "uploadedById" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "storageProvider" TEXT,
    "bucket" TEXT,
    "storagePath" TEXT,
    "checksum" TEXT,
    "mimeType" TEXT,
    "size" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingPoll" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "multipleChoice" BOOLEAN NOT NULL DEFAULT false,
    "createdById" INTEGER NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingPoll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingPollOption" (
    "id" SERIAL NOT NULL,
    "pollId" INTEGER NOT NULL,
    "option" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MeetingPollOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommitteeMeeting_committeeId_idx" ON "CommitteeMeeting"("committeeId");

-- CreateIndex
CREATE INDEX "CommitteeMeeting_startTime_idx" ON "CommitteeMeeting"("startTime");

-- CreateIndex
CREATE INDEX "CommitteeMeeting_status_idx" ON "CommitteeMeeting"("status");

-- AddForeignKey
ALTER TABLE "MeetingSummary" ADD CONSTRAINT "MeetingSummary_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "CommitteeMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMeeting" ADD CONSTRAINT "CommitteeMeeting_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingNote" ADD CONSTRAINT "MeetingNote_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "CommitteeMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingNote" ADD CONSTRAINT "MeetingNote_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingRecording" ADD CONSTRAINT "MeetingRecording_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "CommitteeMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttachment" ADD CONSTRAINT "MeetingAttachment_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "CommitteeMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttachment" ADD CONSTRAINT "MeetingAttachment_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingPoll" ADD CONSTRAINT "MeetingPoll_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "CommitteeMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingPoll" ADD CONSTRAINT "MeetingPoll_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingPollOption" ADD CONSTRAINT "MeetingPollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "MeetingPoll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
