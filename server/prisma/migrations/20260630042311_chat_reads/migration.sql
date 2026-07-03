-- CreateTable
CREATE TABLE "ChatRead" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatRead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatRead_messageId_membershipId_key" ON "ChatRead"("messageId", "membershipId");

-- AddForeignKey
ALTER TABLE "ChatRead" ADD CONSTRAINT "ChatRead_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRead" ADD CONSTRAINT "ChatRead_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
