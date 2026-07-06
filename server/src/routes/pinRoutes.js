const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    pinMessage,
    unpinMessage,
    getPinnedMessages,
    getPinnedCount,
} = require("../controllers/pinController");

router.post(
    "/",
    authMiddleware,
    pinMessage
);

router.delete(
    "/:messageId",
    authMiddleware,
    unpinMessage
);

router.get(
    "/room/:roomId",
    authMiddleware,
    getPinnedMessages
);

router.get(
    "/room/:roomId/count",
    authMiddleware,
    getPinnedCount
);

module.exports = router;