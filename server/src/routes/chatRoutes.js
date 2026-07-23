const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");

const {
    createChatRoom,
    sendMessage,
    getMessages,
    editChatMessage,
    toggleReaction,
    removeForMe,
    removeForEveryone,
    searchMessages,
    uploadChatFile
} = require("../controllers/chatController");

router.post(
    "/rooms", 
    protect, 
    createChatRoom
);

router.post(
    "/room/:roomId", 
    protect, 
    sendMessage
);

router.get(
    "/room/:roomId", 
    protect, 
    getMessages
);

router.post(
    "/reaction/:messageId", 
    protect, 
    toggleReaction
);

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
    "/upload/complete",
    protect,
    uploadChatFile
);

module.exports = router;