-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ClubRole" AS ENUM ('MEMBER', 'LEAD', 'TREASURER', 'SECRETARY', 'PRESIDENT');

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "clubRole" "ClubRole" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "status" "MembershipStatus" NOT NULL DEFAULT 'PENDING';
