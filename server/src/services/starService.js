const prisma = require("../config/prisma");
const auditLogger = require("../utils/auditLogger");

const toggleStar = async (req, messageId, membershipId) => {
    messageId = Number(messageId);
    membershipId = Number(membershipId);

    const existing = await prisma.starredMessage.findUnique({
        where: {
            membershipId_messageId: {
                membershipId,
                messageId
            }
        }
    });

    if (existing) {
        await prisma.starredMessage.delete({
            where: {
                id: existing.id
            }
        });

        await auditLogger(req, {
            action: "MESSAGE_UNSTARRED",
            entityType: "ChatMessage",
            entityId: messageId
        });

        return {
            starred: false
        };
    }

    await prisma.starredMessage.create({
        data: {
            membershipId,
            messageId
        }
    });

    await auditLogger(req, {
        action: "MESSAGE_STARRED",
        entityType: "ChatMessage",
        entityId: messageId
    });

    return {
        starred: true
    };
};

const getStarredMessages = async (membershipId) => {
    membershipId = Number(membershipId);
    
    return prisma.starredMessage.findMany({
        where: {
            membershipId,
        },
        include: {
            message: {
                include: {
                    membership: {
                        include: {
                            user: true,
                        },
                    },
                    reactions: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

module.exports = {
    toggleStar,
    getStarredMessages,
};