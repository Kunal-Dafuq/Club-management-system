const starService = require("../services/starService");

const toggleStar = async (req, res) => {
    try {

        const { messageId } = req.body;

        const message=await prisma.chatMessage.findUnique({
            where:{
                id:Number(messageId)
            },
            select:{
                room:{
                    select:{
                        clubId:true
                    }
                }
            }
        });

        const membership=await prisma.membership.findFirst({
            where:{
                userId:req.user.id,
                clubId:message.room.clubId,
                status:"APPROVED"
            }
        });

        const membershipId=membership.id;

        const result = await starService.toggleStar(
            Number(messageId),
            membershipId
        );

        res.json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });

    }
};

const getStarredMessages = async (req, res) => {
    try {
        const message=await prisma.chatMessage.findUnique({
            where:{
                id:Number(messageId)
            },
            select:{
                room:{
                    select:{
                        clubId:true
                    }
                }
            }
        });

        const membership=await prisma.membership.findFirst({
            where:{
                userId:req.user.id,
                clubId:message.room.clubId,
                status:"APPROVED"
            }
        });

        const membershipId=membership.id;

        const messages =
            await starService.getStarredMessages(
                membershipId
            );

        res.json(messages);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

module.exports = {
    toggleStar,
    getStarredMessages
};