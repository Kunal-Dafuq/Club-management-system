const prisma = require("../config/prisma");
const createNotification = async ({ userId, message }) => {
    return await prisma.notification.create({
        data: {
            userId,
            message
        }
    });
};

module.exports = {
    createNotification
};