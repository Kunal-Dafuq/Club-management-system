/*
  Warnings:

  - You are about to drop the column `bannerImage` on the `Club` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Club` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ClubCategory" AS ENUM ('TECHNOLOGY', 'CULTURAL', 'SPORTS', 'MUSIC', 'ART', 'LITERARY', 'ENTREPRENEURSHIP', 'RESEARCH', 'SOCIAL', 'FINANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "CommitteeRole" AS ENUM ('MEMBER', 'COORDINATOR', 'HEAD');

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "bannerImage",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "accentColor" TEXT NOT NULL DEFAULT '#60a5fa',
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "category" "ClubCategory" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "established" INTEGER,
ADD COLUMN     "foundedBy" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "isRecruiting" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "motto" TEXT,
ADD COLUMN     "primaryColor" TEXT NOT NULL DEFAULT '#2563eb',
ADD COLUMN     "secondaryColor" TEXT NOT NULL DEFAULT '#1d4ed8',
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "website" TEXT,
ADD COLUMN     "youtube" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ClubTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClubTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubTagAssignment" (
    "clubId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ClubTagAssignment_pkey" PRIMARY KEY ("clubId","tagId")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT DEFAULT '#2563eb',
    "icon" TEXT,
    "isCore" BOOLEAN NOT NULL DEFAULT false,
    "clubId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeMember" (
    "id" SERIAL NOT NULL,
    "committeeId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "role" "CommitteeRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommitteeMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClubTag_name_key" ON "ClubTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_clubId_name_key" ON "Committee"("clubId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeMember_committeeId_membershipId_key" ON "CommitteeMember"("committeeId", "membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Club_slug_key" ON "Club"("slug");

-- AddForeignKey
ALTER TABLE "ClubTagAssignment" ADD CONSTRAINT "ClubTagAssignment_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubTagAssignment" ADD CONSTRAINT "ClubTagAssignment_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ClubTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
