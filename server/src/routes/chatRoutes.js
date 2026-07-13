const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/chatUpload");

const {
    sendMessage,
    getMessages,
    editChatMessage,
    toggleReaction,
    removeForMe,
    removeForEveryone,
    searchMessages,
    uploadChatFile
} = require("../controllers/chatController");

router.post("/room/:roomId", protect, sendMessage);
router.get("/room/:roomId", protect, getMessages);
router.post("/reaction/:messageId", protect, toggleReaction);

router.put(
    "/room/:roomId/:messageId",
    protect,
    editChatMessage
);

router.delete(
    "/messages/:messageId/me",
    protect,
    removeForMe
);

router.delete(
    "/messages/:messageId/everyone",
    protect,
    removeForEveryone
);

router.get(
    "/clubs/:clubId/search",
    protect,
    searchMessages
);

router.post(
    "/upload",
    protect,
    upload.single("file"),
    uploadChatFile
);

module.exports = router;