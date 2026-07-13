const getMembershipId=require("../utils/getMembershipId");

const {markAsRead}=require("../services/readService");

const prisma=require("../config/prisma");

const markRead=async(req,res)=>{
    const messageId=Number(req.params.messageId);

    const message=await prisma.chatMessage.findUnique({
        where:{
            id:messageId
        },

        select:{
            room:{
                select:{
                    clubId:true
                }
            }
        }
    });

    const membershipId=getMembershipId(
        req,
        message.room.clubId
    );

    await markAsRead(
        messageId,
        membershipId
    );

    res.json({
        success:true
    });
};

module.exports={
    markRead
};