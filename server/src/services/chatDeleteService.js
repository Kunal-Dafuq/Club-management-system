const prisma=require("../config/prisma");

const deleteForMe=async(
    userId,
    messageId
)=>{
    await prisma.deletedChatMessage.create({
        data:{
            userId,
            messageId
        }
    });
};

const deleteForEveryone=async(
    userId,
    messageId
)=>{
    const message=
        await prisma.chatMessage.findUnique({
            where:{
                id:messageId
            },
            include:{
                membership:true
            }
        });

    if(!message){
        throw new Error("Message not found");
    }

    if(message.membership.userId!==userId){
        throw new Error("Unauthorized");
    }

    const diff=
        Date.now()-new Date(message.createdAt);

    if(diff>15*60*1000){
        throw new Error("Delete window expired");
    }

    return prisma.chatMessage.update({
        where:{
            id:messageId
        },
        data:{
            deletedForAll:true,
            deletedAt:new Date()
        }
    });
};

module.exports={
    deleteForMe,
    deleteForEveryone
};