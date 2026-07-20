const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {
    getMyNotifications,
    markAsRead,
    deleteNotification,
    unreadCount,
    markAllNotifications
} = require("../controllers/notificationController");

router.get(
    "/",
    protect,
    getMyNotifications
);

router.put(
    "/:id/read",
    protect,
    markAsRead
);

router.get(
    "/count",
    protect,
    unreadCount
);

router.patch(
    "/read-all",
    protect,
    markAllNotifications
);

router.delete(
    "/:id",
    protect,
    deleteNotification
);

module.exports = router;