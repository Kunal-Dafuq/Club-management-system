const prisma = require("../config/prisma");

const {sendMessage} = require("../services/chatService");
const {sendMessage, markDelivered, markRead} = require("../services/chatService");

const registerChatSocket = (io) => {
    const messages = await chatService.getMessages(roomId);

    io.to(`room-${roomId}`).emit("reaction-updated",messages);

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
                    data.content || null,
                    data.replyToId || null,

                    {
                        fileUrl:data.fileUrl,
                        fileName:data.fileName,
                        fileType:data.fileType,
                        fileSize:data.fileSize
                    }
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

        socket.on(
            "message-delivered",
            async(messageId)=>{
                const updated=
                    await markDelivered(messageId);

                io.to(
                    `room-${updated.clubId}`
                ).emit(
                    "message-status",
                    updated
                );
            }
        );

        socket.on("message-read", async (messageId) => {
            const message = await markRead(messageId);
            io.to(`room-${message.clubId}`).emit(
                "message-status",
                message
            );
        });
    });
};

module.exports = registerChatSocket;