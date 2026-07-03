import axios from "./axios";

const prisma = require("../config/prisma");

const sendMessage = async (
    roomId,
    membershipId,
    content,
    replyToId = null
) => {
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
            "Unauthorized"
        );
    }

    const message = await sendMessage(
        Number(data.roomId),
        membership.id,
        data.content,
        data.replyToId
    );
};

const getMessages = async (
    roomId,
    cursor,
    limit = 30
) => {
    return prisma.chatMessage.findMany({
        where:{
            roomId,
            deletedBy:{
                none:{
                    userId
                }
            }
        },

        include: {
            membership: {
                include: {
                    user: true
                }
            },
            reactions: true,
            replyTo: {
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
        },

        ...(cursor && {
            cursor: {
                id: cursor
            },
            skip: 1
        }),
        take: limit
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
            emoji
        }
    });

    if (existing) {
        await prisma.chatReaction.delete({
            where: {
                id: existing.id
            }
        });

        return null;

    }

    return prisma.chatReaction.create({
        data: {
            messageId,
            membershipId,
            emoji
        }
    });
};

const editMessage = async (
    messageId,
    membershipId,
    content
) => {
    const message =
        await prisma.chatMessage.findUnique({

            where:{
                id:messageId
            }
        });

    if(!message){
        throw new Error("Message not found");
    }

    if(message.membershipId!==membershipId){
        throw new Error("Unauthorized");
    }

    const fifteenMinutes=15*60*1000;

    if(
        Date.now()-message.createdAt.getTime()
        >fifteenMinutes
    ){
        throw new Error("Edit time expired");
    }

    return prisma.chatMessage.update({
        where:{
            id:messageId
        },
        data:{
            content,
            edited:true
        },

        include:{
            membership:{
                include:{
                    user:true
                }
            },
            reactions:true,
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

const markDelivered = async (messageId) => {
    return prisma.chatMessage.update({
        where:{
            id:messageId
        },
        data:{
            deliveredAt:new Date()
        },
        include:{
            membership:{
                include:{
                    user:true
                }
            },
            reactions:true,
            replyTo:true
        }
    });
};

const markRead = async(messageId)=>{
    return prisma.chatMessage.update({
        where:{
            id:messageId
        },
        data:{
            readAt:new Date()
        },
        include:{
            membership:{
                include:{
                    user:true
                }
            },
            reactions:true,
            replyTo:true
        }
    });
};

const uploadChatFile = async(file)=>{
    const formData=new FormData();

    formData.append(
        "file",
        file
    );

    return axios.post(
        "/upload/chat",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );
};

module.exports={
    sendMessage,
    getMessages,
    editMessage,
    markDelivered,
    markRead,
    toggleReaction,
    uploadChatFile
};