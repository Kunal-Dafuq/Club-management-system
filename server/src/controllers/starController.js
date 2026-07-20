const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const starService = require("../services/starService");

const toggleStar = asyncHandler(async (req, res) => {
    const { messageId } = req.body;

    if (!messageId) {
        throw new ApiError(
            400,
            "Message id required."
        );
    }

    const star = await starService.toggleStar(
        Number(messageId),
        req.membership.id
    );

    res.json({
        success: true,
        star
    });
});

const getStarredMessages = asyncHandler(async (req, res) => {
    const starred = await starService.getStarredMessages(
        Number(req.params.roomId),
        req.membership.id
    );

    res.json({
        success: true,
        total: starred.length,
        starred
    });
});

module.exports = {
    toggleStar,
    getStarredMessages
};