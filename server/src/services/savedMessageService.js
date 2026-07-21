const prisma = require("../config/prisma");
const auditLogger = require("../utils/auditLogger");

const toggleSavedMessage = async (req, membershipId, messageId) => {
    membershipId = Number(membershipId);
    messageId = Number(messageId);

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

        await auditLogger(req, {
            action: "MESSAGE_UNSAVED",
            entityType: "ChatMessage",
            entityId: messageId
        });

        return { saved: false };
    }

    await prisma.savedMessage.create({
        data: {
            membershipId,
            messageId
        }
    });

    await auditLogger(req, {
        action: "MESSAGE_SAVED",
        entityType: "ChatMessage",
        entityId: messageId
    });

    return { saved: true };
};

const getSavedMessages = async (membershipId) => {
    membershipId = Number(membershipId);
    
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