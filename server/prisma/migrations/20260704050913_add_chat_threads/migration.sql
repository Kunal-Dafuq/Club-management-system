-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "ChatRead" DROP CONSTRAINT "ChatRead_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "ChatRead" DROP CONSTRAINT "ChatRead_messageId_fkey";

-- DropForeignKey
ALTER TABLE "DeletedChatMessage" DROP CONSTRAINT "DeletedChatMessage_messageId_fkey";

-- DropForeignKey
ALTER TABLE "Mention" DROP CONSTRAINT "Mention_messageId_fkey";

-- CreateTable
CREATE TABLE "ChatThread" (
    "id" SERIAL NOT NULL,
    "rootMessageId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "content" TEXT,
    "fileUrl" TEXT,
    "fileName" TEXT,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "parentThreadId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "editedAt" TIMESTAMP(3),
    "deletedForAll" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChatThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatThreadReaction" (
    "id" SERIAL NOT NULL,
    "threadId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatThreadReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatThread_rootMessageId_idx" ON "ChatThread"("rootMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatThreadReaction_threadId_membershipId_emoji_key" ON "ChatThreadReaction"("threadId", "membershipId", "emoji");

-- CreateIndex
CREATE INDEX "ChatMessage_roomId_idx" ON "ChatMessage"("roomId");

-- CreateIndex
CREATE INDEX "ChatMessage_membershipId_idx" ON "ChatMessage"("membershipId");

-- CreateIndex
CREATE INDEX "ChatMessage_createdAt_idx" ON "ChatMessage"("createdAt");

-- CreateIndex
CREATE INDEX "ChatRoom_clubId_idx" ON "ChatRoom"("clubId");

-- CreateIndex
CREATE INDEX "ChatRoom_committeeId_idx" ON "ChatRoom"("committeeId");

-- CreateIndex
CREATE INDEX "Mention_messageId_idx" ON "Mention"("messageId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRead" ADD CONSTRAINT "ChatRead_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRead" ADD CONSTRAINT "ChatRead_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeletedChatMessage" ADD CONSTRAINT "DeletedChatMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThread" ADD CONSTRAINT "ChatThread_rootMessageId_fkey" FOREIGN KEY ("rootMessageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThread" ADD CONSTRAINT "ChatThread_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThread" ADD CONSTRAINT "ChatThread_parentThreadId_fkey" FOREIGN KEY ("parentThreadId") REFERENCES "ChatThread"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThreadReaction" ADD CONSTRAINT "ChatThreadReaction_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "ChatThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThreadReaction" ADD CONSTRAINT "ChatThreadReaction_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
