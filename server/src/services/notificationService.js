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

    await createNotification({
    userId,
    type:"MENTION",
    title:"You were mentioned",
    body:`${sender.name} mentioned you.`
});

    return notification;
};

module.exports = {
    createNotification
};