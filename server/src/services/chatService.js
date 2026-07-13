const prisma = require("../config/prisma");

const formatMessage = require("../utils/chatMessageFormatter");
const chatInclude = require("../utils/chatInclude");

const sendMessage = async (
    roomId,
    membershipId,
    content,
    replyToId = null,
    attachments = []
) => {
  const trimmedContent = content?.trim() || "";

  if (
      trimmedContent.length === 0 &&
      attachments.length === 0
  ) {
      throw new Error("Message cannot be empty.");
  }

  return prisma.$transaction(async (tx) => {
      if (replyToId) {
          const parent =
            await tx.chatMessage.findUnique({
                  where:{
                      id:replyToId
                  }
              });

          if(!parent){
              throw new Error("Reply message not found.");
          }
      }
      return tx.chatMessage.create({
          data: {
              roomId,
              membershipId,
              content: trimmedContent || null,
              replyToId,

              attachments: {
                  create: attachments.map(file => ({
                      fileUrl: file.fileUrl,
                      fileName: file.fileName,
                      fileType: file.fileType,
                      fileSize: file.fileSize
                          ? BigInt(file.fileSize)
                          : BigInt(0),
                      fileExtension: file.fileExtension || null,
                      mimeCategory: file.mimeCategory || "OTHER",
                      thumbnailUrl: file.thumbnailUrl || null
                  }))
              }
          },

          include: chatInclude

      });
  });
};

const getMessages = async (
    roomId,
    membershipId,
    userId,
    cursor = null,
    limit = 30
) => {
  const messages = await prisma.chatMessage.findMany({
    where: {
      roomId,

      deletedBy: {
        none: {
          userId,
        },
      },
    },

    include: chatInclude,

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

  return messages.map(message =>
    formatMessage(
      message,
      membershipId
    )
  );
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
      emoji
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
      emoji
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

    include: chatInclude,

    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  sendMessage,
  getMessages,
  toggleReaction,
  markDelivered,
  searchMessages
};