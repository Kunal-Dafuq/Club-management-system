const pinService = require("../../services/chat/pinService");

const pinMessage = async (req, res) => {
    try {
        const { messageId } = req.body;
        const membershipId = req.user.membershipId;

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

/*
|--------------------------------------------------------------------------
| Get Pin Count
|--------------------------------------------------------------------------
*/

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