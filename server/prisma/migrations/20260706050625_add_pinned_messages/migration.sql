-- CreateTable
CREATE TABLE "PinnedMessage" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "pinnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PinnedMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PinnedMessage_messageId_key" ON "PinnedMessage"("messageId");

-- AddForeignKey
ALTER TABLE "PinnedMessage" ADD CONSTRAINT "PinnedMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PinnedMessage" ADD CONSTRAINT "PinnedMessage_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
