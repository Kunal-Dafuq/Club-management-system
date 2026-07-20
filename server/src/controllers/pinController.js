const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const pinService = require("../services/pinService");
const { success } = require("zod");

const pinMessage = asyncHandler(async (req, res) => {
    const roomId = Number(req.body.roomId);

    const membershipId = getMembershipId(req, roomId);

    if (!membershipId) {
        throw new ApiError(
            403,
            "Not a room member."
        );
    }

    const message = await pinService.pinMessage(
        Number(req.params.messageId),
        membershipId
    );

    req.io
        ?.to(`room-${roomId}`)
        .emit("message:pinned", message);

    res.json({
        success: true,
        message: "Message pinned.",
        data: message
    });
});

const unpinMessage = asyncHandler(async (req, res) => {
    const roomId = Number(req.body.roomId);

    const membershipId = getMembershipId(req, roomId);

    if (!membershipId) {
        throw new ApiError(
            403,
            "Not a room member."
        );
    }

    await pinService.unpinMessage(
        Number(req.params.messageId),
        membershipId
    );

    req.io
        ?.to(`room-${roomId}`)
        .emit("message:unpinned", {
            messageId: Number(req.params.messageId)
        });

    res.json({
        success: true,
        message: "Message unpinned."
    });
});

const getPinnedMessages = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.roomId);

    const messages = await pinService.getPinnedMessages(roomId);

    res.json({
        success: true,
        total: messages.length,
        messages
    });
});

const getPinnedCount = asyncHandler(async (req, res) => {
        const { roomId } = req.params;

        const count = await pinService.getPinnedCount(roomId);

        res.json({
            success:true,
            count
        });
});

module.exports = {
    pinMessage,
    unpinMessage,
    getPinnedMessages,
    getPinnedCount,
};