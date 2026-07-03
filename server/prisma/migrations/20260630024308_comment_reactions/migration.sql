-- CreateTable
CREATE TABLE "TaskCommentReaction" (
    "id" SERIAL NOT NULL,
    "emoji" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskCommentReaction_commentId_membershipId_emoji_key" ON "TaskCommentReaction"("commentId", "membershipId", "emoji");

-- AddForeignKey
ALTER TABLE "TaskCommentReaction" ADD CONSTRAINT "TaskCommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "TaskComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCommentReaction" ADD CONSTRAINT "TaskCommentReaction_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
