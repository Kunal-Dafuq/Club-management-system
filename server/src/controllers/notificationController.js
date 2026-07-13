const prisma = require("../config/prisma");
const getMyNotifications = async(req,res)=>{
    try{
        const userId = req.user.id;
        const notifications = await prisma.notification.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:"desc"
            }
        });

        res.status(200).json({
            count:notifications.length,
            notifications
        });
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const notificationId = Number(req.params.id);
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        if (notification.userId !== userId) {
            return res.status(403).json({
                message: "Not allowed"
            });
        }

        const updated = await prisma.notification.update({
            where: {
                id: notificationId
            },
            data: {
                isRead: true
            }
        });

        res.status(200).json(updated);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};


const deleteNotification = async (req, res) => {
    try {
        const userId = req.user.id;
        const notificationId = Number(req.params.id);
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId
            },
            data:{
                deletedAt:new Date()
            }
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        if (notification.userId !== userId) {
            return res.status(403).json({
                message: "Not allowed"
            });
        }

        await prisma.notification.delete({
            where: {
                id: notificationId
            }
        });

        res.status(200).json({
            message: "Notification deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getMyNotifications,
    markAsRead,
    deleteNotification
};