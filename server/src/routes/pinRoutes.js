const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    pinMessage,
    unpinMessage,
    getPinnedMessages,
    getPinnedCount
} = require("../controllers/pinController");

router.post(
    "/",
    protect,
    pinMessage
);

router.delete(
    "/:messageId",
    protect,
    unpinMessage
);

router.get(
    "/room/:roomId",
    protect,
    getPinnedMessages
);

router.get(
    "/room/:roomId/count",
    protect,
    getPinnedCount
);

module.exports = router;