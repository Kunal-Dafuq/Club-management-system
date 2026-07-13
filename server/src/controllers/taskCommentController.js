const service = require("../services/taskCommentService");

const createComment = async (req, res) => {
    try {
        const taskId = Number(req.params.taskId);
        const userId = req.user.id;
        const { content } = req.body;
        const comment =
        await service.createComment(
            taskId,
            userId,
            content
        );

        res.status(201).json(comment);

    }

    catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const replyComment = async (req, res) => {
    try {
        const parentId = Number(req.params.id);
        const userId = req.user.id;
        const { content } = req.body;
        const reply = await service.replyComment(
            parentId,
            userId,
            content
        );

        res.status(201).json(reply);

    }

    catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await service.updateComment(
            Number(req.params.id),
            req.user.id,
            req.body.content
        )

        res.json(comment);

    }

    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        await service.deleteComment(
            Number(req.params.id),
            req.user.id
        );

        res.json({
            message: "Comment deleted"
        });
    }

    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const getTaskComments = async (req, res) => {
    try {
        const comments = await service.getTaskComments(
            Number(req.params.taskId)
        );

        res.json(comments);

    }

    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

module.exports = {
    createComment,
    replyComment,
    updateComment,
    deleteComment,
    getTaskComments
};