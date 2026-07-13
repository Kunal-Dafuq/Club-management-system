-- CreateTable
CREATE TABLE "ChatLastRead" (
    "id" SERIAL NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "lastMessageId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatLastRead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatLastRead_membershipId_roomId_key" ON "ChatLastRead"("membershipId", "roomId");

-- AddForeignKey
ALTER TABLE "ChatLastRead" ADD CONSTRAINT "ChatLastRead_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatLastRead" ADD CONSTRAINT "ChatLastRead_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
