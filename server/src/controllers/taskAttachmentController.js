const service = require("../services/taskAttachmentService");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const uploadAttachment = asyncHandler(async (req, res) => {
    const taskId = Number(req.params.taskId);

    if (!req.body.storage) {
        throw new ApiError(
            400,
            "Storage metadata is required."
        );
    }

    const attachment = await service.uploadAttachment(
        taskId,
        req.user.id,
        req.body.storage
    );

    res.status(201).json({
        success: true,
        attachment
    });
});

const getAttachments = asyncHandler(async (req, res) => {
    const attachments = await service.getAttachments(
        Number(req.params.taskId)
    );

    res.json({
        success: true,
        count: attachments.length,
        attachments
    });
});

const deleteAttachment = asyncHandler(async (req, res) => {
    await service.deleteAttachment(
        Number(req.params.id),
        req.user.id
    );

    res.json({
        success: true,
        message: "Attachment deleted."
    });
});

module.exports = {
    uploadAttachment,
    getAttachments,
    deleteAttachment
};