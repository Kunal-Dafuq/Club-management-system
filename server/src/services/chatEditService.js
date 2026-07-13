const prisma = require("../config/prisma");

const chatInclude = require("../utils/chatInclude");

const editMessage = async (
    userId,
    messageId,
    content
) => {

    const message = await prisma.chatMessage.findUnique({
        where: {
            id: messageId
        },
        include: chatInclude
    });

    if (!message) {
        throw new Error("Message not found");
    }

    if (message.membership.userId !== userId) {
        throw new Error("Unauthorized");
    }

    const diff =
        Date.now() - new Date(message.createdAt).getTime();

    if (diff > 15 * 60 * 1000) {
        throw new Error("Edit window expired");
    }

    return prisma.chatMessage.update({
        where: {
            id: messageId
        },
        data: {
            content,
            editedAt: new Date(),
            edited:true
        },
        include: chatInclude
    });
};

module.exports = {
    editMessage
};