const prisma = require("../config/prisma");
const { createAuditLog } = require("./auditService");

const deleteForMe = async (userId, messageId) => {
    await prisma.deletedChatMessage.create({
        data: {
            userId,
            messageId,
        },
    });

    return {
        success: true,
    };
};

const deleteForEveryone = async (userId, messageId) => {
    const message = await prisma.chatMessage.findUnique({
        where: {
            id: messageId,
        },
        include: {
            membership: true,
        },
    });

    if (!message) {
        throw new Error("Message not found.");
    }

    if (message.membership.userId !== userId) {
        throw new Error("Unauthorized.");
    }

    const diff = Date.now() - new Date(message.createdAt).getTime();

    if (diff > 15 * 60 * 1000) {
        throw new Error("Delete window expired.");
    }

    const deletedMessage = await prisma.chatMessage.update({
        where: {
            id: messageId,
        },
        data: {
            deletedForAll: true,
            deletedAt: new Date(),
            content: "This message was deleted.",
        },
    });

    await createAuditLog({
        action: "MESSAGE_DELETED",
        entityType: "ChatMessage",
        entityId: deletedMessage.id,
        performedById: userId,
        clubId: message.clubId ?? null,
        metadata: {
            roomId: message.roomId ?? null,
            deleteType: "EVERYONE",
        },
    });

    return deletedMessage;
};

module.exports = {
    deleteForMe,
    deleteForEveryone,
};