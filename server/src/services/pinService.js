const prisma = require("../config/prisma");

const pinMessage = async (messageId, membershipId) => {
    const message = await prisma.chatMessage.findUnique({
        where: {
            id: Number(messageId),
        },
    });

    if (!message) {
        throw new Error("Message not found.");
    }

    const existingPin = await prisma.chatPin.findUnique({
        where: {
            messageId: Number(messageId),
        },
    });

    if (existingPin) {
        throw new Error("Message is already pinned.");
    }

    return prisma.chatPin.create({
        data: {
            messageId: Number(messageId),
            pinnedById: Number(membershipId),
        },
        include: {
            pinnedBy: {
                include: {
                    user: true,
                },
            },
            message: {
                include: {
                    membership: {
                        include: {
                            user: true,
                        },
                    },

                    attachments: true,

                    reactions: {
                        include: {
                            membership: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },

                    replyTo: {
                        include: {
                            membership: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

const unpinMessage = async (messageId) => {
    const pin = await prisma.chatPin.findUnique({
        where: {
            messageId: Number(messageId),
        },
    });

    if (!pin) {
        throw new Error("Pinned message not found.");
    }

    await prisma.chatPin.delete({
        where: {
            messageId: Number(messageId),
        },
    });

    return {
        success: true,
    };
};

const getPinnedMessages = async (roomId) => {
    return prisma.chatPin.findMany({
        where: {
            message: {
                roomId: Number(roomId),
            },
        },

        orderBy: {
            createdAt: "desc",
        },

        include: {
            pinnedBy: {
                include: {
                    user: true,
                },
            },

            message: {
                include: {
                    membership: {
                        include: {
                            user: true,
                        },
                    },

                    reactions: true,

                    replyTo: {
                        include: {
                            membership: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

const isPinned = async (messageId) => {
    const pin = await prisma.chatPin.findUnique({
        where: {
            messageId: Number(messageId),
        },
    });

    return !!pin;
};

const getPinnedCount = async (roomId) => {
    return prisma.chatPin.count({
        where: {
            message: {
                roomId: Number(roomId),
            },
        },
    });
};

module.exports = {
    pinMessage,
    unpinMessage,
    getPinnedMessages,
    isPinned,
    getPinnedCount,
};