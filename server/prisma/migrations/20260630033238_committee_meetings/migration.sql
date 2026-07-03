/*
  Warnings:

  - You are about to drop the column `fileType` on the `TaskAttachment` table. All the data in the column will be lost.
  - You are about to drop the column `membershipId` on the `TaskAttachment` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `TaskAttachment` table. All the data in the column will be lost.
  - Added the required column `uploadedById` to the `TaskAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MeetingAttendanceStatus" AS ENUM ('PENDING', 'GOING', 'MAYBE', 'NOT_GOING');

-- DropForeignKey
ALTER TABLE "TaskAttachment" DROP CONSTRAINT "TaskAttachment_membershipId_fkey";

-- AlterTable
ALTER TABLE "TaskAttachment" DROP COLUMN "fileType",
DROP COLUMN "membershipId",
DROP COLUMN "uploadedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "uploadedById" INTEGER NOT NULL,
ALTER COLUMN "fileSize" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MeetingAttendance" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "status" "MeetingAttendanceStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "MeetingAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeMeeting" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "onlineLink" TEXT,
    "committeeId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommitteeMeeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetingAttendance_meetingId_membershipId_key" ON "MeetingAttendance"("meetingId", "membershipId");

-- AddForeignKey
ALTER TABLE "MeetingAttendance" ADD CONSTRAINT "MeetingAttendance_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "CommitteeMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendance" ADD CONSTRAINT "MeetingAttendance_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMeeting" ADD CONSTRAINT "CommitteeMeeting_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMeeting" ADD CONSTRAINT "CommitteeMeeting_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAttachment" ADD CONSTRAINT "TaskAttachment_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
