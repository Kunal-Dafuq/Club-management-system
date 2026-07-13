const pinService = require("../services/pinService");

const pinMessage = async (req, res) => {
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

        const pin = await pinService.pinMessage(
            messageId,
            membershipId
        );

        res.status(201).json(pin);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const unpinMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        await pinService.unpinMessage(messageId);

        res.json({
            message: "Message unpinned successfully.",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const getPinnedMessages = async (req, res) => {
    try {
        const { roomId } = req.params;

        const messages =
            await pinService.getPinnedMessages(roomId);

        res.json(messages);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getPinnedCount = async (req, res) => {
    try {
        const { roomId } = req.params;

        const count =
            await pinService.getPinnedCount(roomId);

        res.json({
            count,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    pinMessage,
    unpinMessage,
    getPinnedMessages,
    getPinnedCount,
};