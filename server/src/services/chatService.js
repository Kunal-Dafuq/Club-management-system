const prisma = require("../config/prisma");

const sendMessage = async (
    roomId,
    membershipId,
    content,
    replyToId = null,
    attachments = []
) => {
  return prisma.chatMessage.create({
    data: {
      roomId,
      membershipId,
      content,
      replyToId,
      attachments: {
        create: attachments.map((file) => ({
          fileUrl: file.fileUrl,
          fileName: file.fileName,
          fileType: file.fileType,
          fileSize: BigInt(file.fileSize),
          fileExtension: file.fileExtension || null,
          mimeCategory: file.mimeCategory || null,
          thumbnailUrl: file.thumbnailUrl || null,
        })),
      },
    },
    include:{
      attachments:true,

      membership:{
          include:{
              user:true
          }
      },

      reactions:{
          include:{
              membership:{
                  include:{
                      user:true
                  }
              }
          }
      },

      replyTo:{
          include:{
              membership:{
                  include:{
                      user:true
                  }
              }
          }
      }
    }
  });
};

const getMessages = async (
  roomId,
  userId,
  cursor = null,
  limit = 30
) => {
  return prisma.chatMessage.findMany({
    where: {
      roomId,

      deletedBy: {
        none: {
          userId,
        },
      },
    },

    include: {
      attachments:true,

      membership: {
        include: {
          user: true,
        },
      },

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

    orderBy: {
      createdAt: "desc",
    },

    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),

    take: limit,
  });
};

const editMessage = async (
  messageId,
  membershipId,
  content
) => {
  const message = await prisma.chatMessage.findUnique({
    where: {
      id: messageId,
    },
  });

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.membershipId !== membershipId) {
    throw new Error("Unauthorized");
  }

  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  if (
    Date.now() - message.createdAt.getTime() >
    FIFTEEN_MINUTES
  ) {
    throw new Error("Edit window expired");
  }

  return prisma.chatMessage.update({
    where: {
      id: messageId,
    },

    data: {
      content,
      edited: true,
      editedAt: new Date(),
    },

    include: {
      attachments:true,

      membership: {
        include: {
          user: true,
        },
      },

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
  });
};

const toggleReaction = async (
  messageId,
  membershipId,
  emoji
) => {
  const existing = await prisma.chatReaction.findFirst({
    where: {
      messageId,
      membershipId,
      emoji,
    },
  });

  if (existing) {
    await prisma.chatReaction.delete({
      where: {
        id: existing.id,
      },
    });

    return {
      added: false,
    };
  }

  await prisma.chatReaction.create({
    data: {
      messageId,
      membershipId,
      emoji,
    },
  });

  return {
    added: true,
  };
};

const markDelivered = async (messageId) => {
  return prisma.chatMessage.update({
    where: {
      id: messageId,
    },

    data: {
      deliveredAt: new Date(),
    },
  });
};

const markRead = async (messageId) => {
  return prisma.chatMessage.update({
    where: {
      id: messageId,
    },

    data: {
      readAt: new Date(),
    },
  });
};

const deleteForEveryone = async (
  messageId,
  membershipId
) => {
  const message = await prisma.chatMessage.findUnique({
    where: {
      id: messageId,
    },
  });

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.membershipId !== membershipId) {
    throw new Error("Unauthorized");
  }

  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  if (
    Date.now() - message.createdAt.getTime() >
    FIFTEEN_MINUTES
  ) {
    throw new Error("Delete window expired");
  }

  return prisma.chatMessage.update({
    where: {
      id: messageId,
    },

    data: {
      deletedForAll: true,
      content: "This message was deleted",
    },
  });
};

const searchMessages = async (
  roomId,
  query
) => {
  return prisma.chatMessage.findMany({
    where: {
      roomId,

      content: {
        contains: query,
        mode: "insensitive",
      },

      deletedForAll: false,
    },

    include: {
      attachments:true,
      membership: {
        include: {
          user: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const pinMessage = async (messageId) => {
    const { data } = await axios.post("/pins", {
        messageId,
    });

    return data;
};

const unpinMessage = async (messageId) => {
    const { data } = await axios.delete(
        `/pins/${messageId}`
    );

    return data;
};

const getPinnedMessages = async (roomId) => {
    const { data } = await axios.get(
        `/pins/room/${roomId}`
    );

    return data;
};

const getPinnedCount = async (roomId) => {
    const { data } = await axios.get(
        `/pins/room/${roomId}/count`
    );

    return data;
};

const toggleStar = async (messageId) => {
    const { data } = await axios.post(
        "/stars",
        {
            messageId
        }
    );

    return data;

};

const getStarredMessages = async () => {
    const { data } = await axios.get(
        "/stars"
    );

    return data;

};

module.exports = {
  sendMessage,
  getMessages,
  editMessage,
  toggleReaction,
  markDelivered,
  markRead,
  deleteForEveryone,
  searchMessages,
  pinMessage,
  unpinMessage,
  getPinnedMessages,
  getPinnedCount,
  toggleStar,
  getStarredMessages
};