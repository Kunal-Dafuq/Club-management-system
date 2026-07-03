const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createComment,
    replyComment,
    updateComment,
    deleteComment,
    getTaskComments
} = require("../controllers/taskCommentController");

router.post(
    "/task/:taskId",
    protect,
    createComment
);

router.get(
    "/task/:taskId",
    protect,
    getTaskComments
);

router.patch(
    "/:id",
    protect,
    updateComment
);

router.delete(
    "/:id",
    protect,
    deleteComment
);

router.post(
    "/:id/reply",
    protect,
    replyComment
);

module.exports = router;