const asyncHandler = require("../middleware/asyncHandler");
const notificationService = require("../services/notificationService");

const getMyNotifications = asyncHandler(async (req, res) => {
    const notifications = await notificationService.getNotifications(req.user.id);

    res.json({
        success: true,
        notifications
    });
});

const markAsRead = asyncHandler(async (req, res) => {
    const notification = await notificationService.markAsRead(
        Number(req.params.id)
    );

    res.json({
        success: true,
        notification
    });
});

const markAllNotifications = asyncHandler(async (req, res) => {
    await notificationService.markAllAsRead(req.user.id);

    res.json({
        success: true,
        message: "All notifications marked as read."
    });
});

const unreadCount = asyncHandler(async (req, res) => {
    const count = await notificationService.getUnreadCount(req.user.id);

    res.json({
        success: true,
        count
    });
});

const deleteNotification = asyncHandler(async (req, res) => {
    await notificationService.deleteNotification(
        Number(req.params.id),
        req.user.id
    );

    res.json({
        success: true,
        message: "Notification deleted."
    });
});

module.exports = {
    getMyNotifications,
    markAsRead,
    markAllNotifications,
    unreadCount,
    deleteNotification
};