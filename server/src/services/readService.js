const prisma = require("../config/prisma");

const markAsRead = async (messageId, membershipId) => {
    if(!message || !message.room){
        throw new Error("Room not found");
    }
    
    return prisma.chatRead.upsert({
        where: {
            messageId_membershipId: {
                messageId,
                membershipId
            }
        },

        update: {},

        create: {
            messageId,
            membershipId
        }
    });
};

module.exports={
    markAsRead
};