const prisma = require("../config/prisma");

const toggleSavedMessage = async (
    membershipId,
    messageId
) => {
    const existing = await prisma.savedMessage.findUnique({
        where: {
            membershipId_messageId: {
                membershipId,
                messageId
            }
        }
    });

    if (existing) {
        await prisma.savedMessage.delete({
            where: {
                id: existing.id
            }
        });

        return {
            saved: false
        };
    }

    await prisma.savedMessage.create({
        data: {
            membershipId,
            messageId
        }
    });

    await createAuditLog({
        action:"MESSAGE_SAVED",
        entityType:"ChatMessage",
        entityId:messageId
    });

    return {
        saved: true
    };
};

const getSavedMessages = async (membershipId) => {
    return prisma.savedMessage.findMany({
        where: {
            membershipId
        },

        include: {
            message: {
                include: {
                    membership: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }
    });
};

module.exports = {
    toggleSavedMessage,
    getSavedMessages
};