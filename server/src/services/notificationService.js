const prisma = require("../config/prisma");
const {
    sendRealtimeNotification
} = require("./realtimeNotificationService");

const createNotification = async ({ userId, message }) => {

    const notification = await prisma.notification.create({
        data: {
            userId,
            message
        }
    });

    sendRealtimeNotification(
        userId,
        notification
    );

    return notification;
};

module.exports = {
    createNotification
};