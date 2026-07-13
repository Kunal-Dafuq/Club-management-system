const prisma = require("../config/prisma");

const toggleStar = async (messageId, membershipId) => {

    const existing = await prisma.starredMessage.findUnique({
        where: {
            membershipId_messageId: {
                membershipId,
                messageId,
            },
        },
    });

    if (existing) {
        await prisma.starredMessage.delete({
            where: {
                id: existing.id,
            },
            action:"MESSAGE_UNSTARRED"
        });

        return {
            starred: false,
        };
    }

    await prisma.starredMessage.create({
        data: {
            membershipId,
            messageId,
        },
    });

    await createAuditLog({
        action:"MESSAGE_STARRED",
        entityType:"ChatMessage",
        entityId:messageId
    });

    return {
        starred: true,
    };

};

const getStarredMessages = async (membershipId) => {
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