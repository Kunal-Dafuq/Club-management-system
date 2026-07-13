const service = require("../services/savedMessageService");
const prisma=require("../config/prisma");

const toggle = async (req, res) => {
    try {
        const messageId = Number(req.params.messageId);

        const message = await prisma.chatMessage.findUnique({
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

        const membership = await prisma.membership.findFirst({
            where:{
                userId:req.user.id,
                clubId:message.room.clubId,
                status:"APPROVED"
            }
        });

        if(!membership){
            throw new Error("Membership not found");
        }

        const membershipId=membership.id;

        const result = await service.toggleSavedMessage(
            membershipId,
            messageId
        );

        res.json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const getMine = async (req, res) => {
    try {
        const membership = await prisma.membership.findFirst({

            where:{
                userId:req.user.id,
                clubId:Number(req.params.clubId),
                status:"APPROVED"
            }
        });

        if(!membership){
            throw new Error("Membership not found");
        }

        const messages = await service.getSavedMessages(
            membership.id
        );

        res.json(messages);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

module.exports = {
    toggle,
    getMine
};