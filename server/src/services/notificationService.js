const prisma = require("../config/prisma");
const { getIO } = require("../socket/socket");
const { sendEmail } = require("./emailService");

const createNotification = async ({
    userId,
    title = "Notification",
    message,
    type = "GENERAL",
    category = "INFO", 
    priority = "NORMAL",
    metadata = null,
    actionUrl = null,
    realtime = true,
    email = false,
    emailTo = null,
    emailSubject = null,
    emailHtml = null
}) => {
    if (!userId) {
        throw new Error("userId is required.");
    }

    const notification = await prisma.notification.create({
        data: {
            userId,
            title,
            message,
            type,
            category,
            priority,
            metadata,
            actionUrl
        }
    });

    if (realtime) {
        try {
            const io = getIO();
            io.to(`user-${userId}`).emit("notification:new", notification);
        } catch (err) {
            console.error("Socket notification failed:", err.message);
        }
    }

    if (email && emailTo) {
        try {
            await sendEmail({
                to: emailTo,
                subject: emailSubject || title,
                html: emailHtml || `<h3>${title}</h3><p>${message}</p>`
            });
        } catch (err) {
            console.error("Email notification failed:", err.message);
        }
    }

    return notification;
};

const createBulkNotifications = async (notifications) => {
    return prisma.notification.createMany({
        data: notifications
    });
};

const deleteNotification = async (notificationId, userId) => {
    return prisma.notification.delete({
        where: {
            id: notificationId,
            userId
        }
    });
};

const markAsRead = async (notificationId) => {
    return prisma.notification.update({
        where: {
            id: notificationId
        },
        data: {
            isRead: true,
            readAt: new Date()
        }
    });
};

const markAllAsRead = async (userId) => {
    await prisma.notification.updateMany({
        where: {
            userId,
            isRead: false
        },
        data: {
            isRead: true,
            readAt: new Date()
        }
    });

    return true;
};

const getUnreadCount = async (userId) => {
    return prisma.notification.count({
        where: {
            userId,
            isRead: false
        }
    });
};

const getNotifications = async (userId, options = {}) => {
    const { limit = 25, page = 1 } = options;

    return prisma.notification.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (page - 1) * limit,
        take: limit
    });
};

module.exports = {
    createNotification,
    createBulkNotifications,
    deleteNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    getNotifications
};