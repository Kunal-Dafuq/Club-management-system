const starService = require("../services/starService");

const toggleStar = async (req, res) => {
    try {

        const { messageId } = req.body;

        const membershipId = req.user.membershipId;

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

        const membershipId = req.user.membershipId;

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