const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {getMyNotifications ,markAsRead ,deleteNotification} = require("../controllers/notificationController");

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

router.delete(
    "/:id",
    protect,
    deleteNotification
);

module.exports = router;