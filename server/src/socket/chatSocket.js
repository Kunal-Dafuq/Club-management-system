const prisma = require("../config/prisma");

const {sendMessage,markDelivered,markRead} = require("../services/chatService");

const pinService = require("../services/pinService");

const {addUser,removeUser,getRoomUsers} = require("../services/presenceService");

const registerChatSocket = (io) => {

    io.on("connection", (socket) => {
        console.log("Chat Connected:", socket.id);

        socket.on("join-room", async (roomId) => {

            socket.join(`room-${roomId}`);

            addUser(
                socket.user.id,
                socket.id,
                roomId
            );

            io.to(`room-${roomId}`).emit(
                "online-users",
                getRoomUsers(roomId)
            );
        });

        socket.on("leave-room", (roomId) => {
            socket.leave(`room-${roomId}`);
        });

        socket.on("typing", (data) => {
            socket.to(`room-${data.roomId}`).emit(
                "user-typing",
                {
                    roomId: data.roomId,
                    name: data.name
                }
            );
        });

        socket.on("send-message", async (data) => {
            try {
                const membership = await prisma.membership.findFirst({
                    where: {
                        clubId: Number(data.roomId),
                        userId: socket.user.id,
                        status: "APPROVED"
                    }
                });

                if (!membership) {
                    return socket.emit(
                        "chat-error",
                        "You are not a member of this club."
                    );
                }

                const message=await sendMessage(
                    Number(data.roomId),
                    membership.id,
                    data.content,
                    data.replyToId,
                    data.attachments || []
                );

                io.to(`room-${data.roomId}`).emit(
                    "new-message",
                    message
                );
            }

            catch (err) {
                console.error(err);

                socket.emit(
                    "chat-error",
                    err.message
                );
            }
        });

        socket.on("disconnect", () => {
            const roomId = removeUser(socket.id);
            if (roomId) {
                io.to(`room-${roomId}`).emit(
                    "online-users",
                    getRoomUsers(roomId)
                );
            }
            console.log("Disconnected:", socket.id);
        });

        socket.on("message-delivered", async (messageId) => {
            const updated = await markDelivered(messageId);

            io.to(`room-${updated.roomId}`).emit(
                "message-status",
                updated
            );
        });

        socket.on("message-read", async (messageId) => {
            const message = await markRead(messageId);

            io.to(`room-${message.roomId}`).emit(
                "message-status",
                message
            );
        });

        socket.on("pin-message", async (data) => {
            try {
                const membership = await prisma.membership.findFirst({
                    where: {
                        userId: socket.user.id,
                        clubId: Number(data.roomId),
                        status: "APPROVED",
                    },
                });

                if (!membership) return;

                const pin =
                    await pinService.pinMessage(
                        data.messageId,
                        membership.id
                    );

                io.to(`room-${data.roomId}`).emit(
                    "message-pinned",
                    pin
                );

            } catch (err) {
                socket.emit(
                    "chat-error",
                    err.message
                );
            }
        });

        socket.on("unpin-message", async (data) => {
            try {
                await pinService.unpinMessage(
                    data.messageId
                );

                io.to(`room-${data.roomId}`).emit(
                    "message-unpinned",
                    {
                        messageId: data.messageId,
                    }
                );

            } catch (err) {
                socket.emit(
                    "chat-error",
                    err.message
                );
            }
        });
    });
};

module.exports = registerChatSocket;