const router=require("express").Router();

const {protect}=require("../middleware/authMiddleware");
const upload=require("../middleware/uploadMiddleware");
const controller=require("../controllers/taskAttachmentController");

router.post(
    "/:taskId",
    protect,
    upload.single("file"),
    controller.uploadAttachment
);

router.get(
    "/:taskId",
    protect,
    controller.getAttachments
);

router.delete(
    "/:id",
    protect,
    controller.deleteAttachment
);

const {canManageTask}=require("../middleware/taskPermissionMiddleware");

router.post(
    "/:taskId",
    protect,
    canManageTask,
    upload.single("file"),
    controller.uploadAttachment
);

router.delete(
    "/:id",
    protect,
    canManageTask,
    controller.deleteAttachment
);

module.exports=router;