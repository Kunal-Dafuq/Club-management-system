const router=require("express").Router();

const {protect}=require("../middleware/authMiddleware");

const{sendMessage, getMessages}=require("../controllers/chatController");

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
    editMessage
);

router.delete(
    "/messages/:messageId/me",
    authenticate,
    removeForMe
);

router.delete(
    "/messages/:messageId/everyone",
    authenticate,
    removeForEveryone
);

router.patch(
    "/messages/:messageId",
    authenticate,
    updateMessage
);

router.get(
    "/clubs/:clubId/search",
    authenticate,
    searchMessages
);

router.post(
    "/upload",
    authenticate,
    upload.single("file"),
    uploadChatFile
);

module.exports=router;