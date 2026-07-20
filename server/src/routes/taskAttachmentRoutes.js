const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const { canManageTask } = require("../middleware/taskPermissionMiddleware");

const {
    uploadAttachment,
    getAttachments,
    deleteAttachment
} = require("../controllers/taskAttachmentController");

router.post(
    "/:taskId",
    protect,
    canManageTask,
    uploadAttachment
);

router.get(
    "/:taskId",
    protect,
    getAttachments
);

router.delete(
    "/:id",
    protect,
    canManageTask,
    deleteAttachment
);

module.exports = router;