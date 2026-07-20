const service = require("../services/taskCommentService");

const asyncHandler = require("../middleware/asyncHandler");

const createComment = asyncHandler(async (req, res) => {
    const comment = await service.createComment(
            Number(req.params.taskId),
            req.user.id,
            req.body.content
        );

    res.status(201).json({
        success: true,
        comment
    });
});

const replyComment = asyncHandler(async (req, res) => {
    const reply = await service.replyComment(
            Number(req.params.id),
            req.user.id,
            req.body.content
        );

    res.status(201).json({
        success: true,
        reply
    });
});

const updateComment = asyncHandler(async (req, res) => {
    const comment = await service.updateComment(
            Number(req.params.id),
            req.user.id,
            req.body.content
        );

    res.json({
        success: true,
        comment
    });
});

const deleteComment = asyncHandler(async (req, res) => {
    await service.deleteComment(
        Number(req.params.id),
        req.user.id
    );

    res.json({
        success: true,
        message: "Comment deleted."
    });
});

const getTaskComments = asyncHandler(async (req, res) => {
    const comments =
        await service.getTaskComments(
            Number(req.params.taskId)
        );

    res.json({
        success: true,
        comments
    });
});

module.exports = {
    createComment,
    replyComment,
    updateComment,
    deleteComment,
    getTaskComments
};