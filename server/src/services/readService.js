const prisma = require("../config/prisma");

const markAsRead = async (messageId, membershipId) => {
    const message = await prisma.chatMessage.findUnique({
        where: {
            id: Number(messageId)
        },
        include: {
            room: true
        }
    });

    if (!message || !message.room) {
        throw new Error("Room not found");
    }
    
    return prisma.chatRead.upsert({
        where: {
            messageId_membershipId: {
                messageId: Number(messageId),
                membershipId: Number(membershipId)
            }
        },

        update: {},

        create: {
            messageId: Number(messageId),
            membershipId: Number(membershipId)
        }
    });
};

module.exports={
    markAsRead
};