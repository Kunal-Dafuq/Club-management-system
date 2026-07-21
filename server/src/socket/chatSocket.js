const prisma = require("../config/prisma");

const {sendMessage,markDelivered} = require("../services/chatService");

const pinService = require("../services/pinService");

const {addUser,removeUser,getRoomUsers} = require("../services/presenceService");

const {
    validateRoom,
    validateMessage,
    validatePin
} = require("../middleware/socketValidator");

const registerChatSocket = (io) => {

    io.on("connection", (socket) => {
        console.info(
            `[Socket] Connected: ${socket.id} | User: ${socket.user.id}`
        );
    
        socket.on("join-room", async (roomId) => {
            try {
                validateRoom({
                    roomId
                });

                roomId = Number(roomId);

                const room = await prisma.chatRoom.findUnique({
                    where: {
                        id: roomId
                    }
                });

                if (!room) {
                    return socket.emit(
                        "chat-error",
                        "Room not found."
                    );
                }

                const membership = await prisma.membership.findFirst({
                    where: {
                        clubId: room.clubId,
                        userId: socket.user.id,
                        status: "APPROVED"
                    }
                });

                if (!membership) {
                    return socket.emit(
                        "chat-error",
                        "You are not a member of this room."
                    );
                }

                socket.join(`room-${roomId}`);

                socket.data.roomId = roomId;

                addUser(
                    socket.user.id,
                    socket.id,
                    roomId
                );

                io.to(`room-${roomId}`).emit(
                    "online-users",
                    getRoomUsers(roomId)
                );

            }

            catch(err){

                socket.emit(
                    "chat-error",
                    err.message
                );

            }

        });

        socket.on("leave-room", (roomId) => {
            if (
                !roomId ||
                isNaN(Number(roomId))
            ) {
                return;
            }

            roomId = Number(roomId);

            socket.leave(`room-${roomId}`);

            removeUser(socket.id);

            io.to(`room-${roomId}`).emit(
                "online-users",
                getRoomUsers(roomId)
            );
        });

        socket.on("send-message", async (data) => {
            try {
                validateMessage(data);

                const room = await prisma.chatRoom.findUnique({
                    where: {
                        id: Number(data.roomId)
                    }
                });

                if (!room) {
                    return socket.emit(
                        "chat-error",
                        "Room not found."
                    );
                }

                const membership = await prisma.membership.findFirst({
                    where: {
                        clubId: room.clubId,
                        userId: socket.user.id,
                        status: "APPROVED"
                    }
                });

                if (!membership) {
                    return socket.emit(
                        "chat-error",
                        "You are not a member."
                    );
                }

                const message = await sendMessage(
                    room.id,
                    membership.id,
                    data.content,
                    data.replyToId,
                    data.attachments || []
                );

                io.to(`room-${room.id}`).emit(
                    "new-message",
                    message
                );
            }

            catch(err){
                socket.emit(
                    "chat-error",
                    err.message
                );
            }
        });

        socket.on("typing",(data)=>{
            try{
                validateRoom(data);

                socket.to(
                    `room-${data.roomId}`
                ).emit(
                    "user-typing",
                    {
                        roomId:data.roomId,
                        name:data.name
                    }
                );
            }

            catch(err){
                socket.emit(
                    "chat-error",
                    err.message
                );
            }
        });

        socket.on("message-delivered", async (messageId) => {
            try {
                if (
                    !messageId ||
                    isNaN(Number(messageId))
                ) {
                    throw new Error(
                        "Invalid messageId."
                    );
                }

                await markDelivered(
                    Number(messageId)
                );
            }

            catch (err) {
                socket.emit(
                    "chat-error",
                    err.message
                );
            }
        });

        socket.on("message-read", async (messageId) => {
            if (
                !messageId ||
                isNaN(Number(messageId))
            ) {
                throw new Error(
                    "Invalid messageId."
                );
            }

            try {
                const message = await prisma.chatMessage.findUnique({
                    where:{
                        id:messageId
                    },

                    select:{
                        roomId:true,
                        room:{
                            select:{
                                clubId:true
                            }
                        }
                    }
                });

                if (!message) {
                    return socket.emit(
                        "chat-error",
                        "Message not found."
                    );
                }

                const membership = await prisma.membership.findFirst({
                    where:{
                        userId:socket.user.id,
                        clubId:message.room.clubId
                    }
                });

                if (!membership) {
                    return socket.emit(
                        "chat-error",
                        "Unauthorized"
                    );
                }

                await prisma.chatRead.upsert({
                    where:{
                        messageId_membershipId:{
                            messageId,
                            membershipId:membership.id
                        }
                    },

                    update:{},

                    create:{
                        messageId,
                        membershipId:membership.id
                    }
                });

                const updated = await prisma.chatMessage.findUnique({
                    where:{
                        id:messageId
                    },

                    include:{
                        reads:{
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

                io.to(`room-${message.roomId}`).emit(

                    "message-read",
                    {
                        messageId,
                        reads:updated.reads
                    }
                );
            }

            catch(err){
                console.error(
                    "[Socket Error]",
                    err
                );
            }
        });

        socket.on("pin-message", async (data) => {
            try {
                validatePin(data);

                const room = await prisma.chatRoom.findUnique({
                    where:{
                        id:Number(data.roomId)
                    }
                });

                if (!room) {
                    return socket.emit(
                        "chat-error",
                        "Room not found."
                    );
                }

                const membership = await prisma.membership.findFirst({
                    where:{
                        clubId:room.clubId,
                        userId:socket.user.id,
                        status:"APPROVED"
                    }
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
                validatePin(data);

                await pinService.unpinMessage(
                    data.messageId
                );

                const room = await prisma.chatRoom.findUnique({
                    where:{
                        id:Number(data.roomId)
                    }
                });

                if(!room){
                    return socket.emit(
                        "chat-error",
                        "Room not found."
                    );
                }

                const membership = await prisma.membership.findFirst({
                    where:{
                        clubId:room.clubId,
                        userId:socket.user.id,
                        status:"APPROVED"
                    }
                });

                if (!membership) return;

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