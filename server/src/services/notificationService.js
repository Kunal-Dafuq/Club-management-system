const prisma=require("../config/prisma");

const createNotification=async({
    userId,
    title="Notification",
    message,
    type="GENERAL"
})=>{

    return prisma.notification.create({
        data:{
            userId,
            title,
            message,
            type
        }
    });
};

module.exports={
    createNotification
};