-- CreateTable
CREATE TABLE "ChatPin" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "pinnedById" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatPin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StarredMessage" (
    "id" SERIAL NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StarredMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatPin_messageId_key" ON "ChatPin"("messageId");

-- CreateIndex
CREATE INDEX "StarredMessage_membershipId_idx" ON "StarredMessage"("membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "StarredMessage_membershipId_messageId_key" ON "StarredMessage"("membershipId", "messageId");

-- AddForeignKey
ALTER TABLE "ChatPin" ADD CONSTRAINT "ChatPin_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatPin" ADD CONSTRAINT "ChatPin_pinnedById_fkey" FOREIGN KEY ("pinnedById") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredMessage" ADD CONSTRAINT "StarredMessage_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredMessage" ADD CONSTRAINT "StarredMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
