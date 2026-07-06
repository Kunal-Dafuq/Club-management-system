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