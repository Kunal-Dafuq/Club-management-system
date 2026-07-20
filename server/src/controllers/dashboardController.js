const prisma = require("../config/prisma");

const asyncHandler = require("../middleware/asyncHandler");

const getClubDashboard = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const [
        clubs,
        upcomingEvents,
        notifications,
        tasks
    ] = await Promise.all([

        prisma.membership.findMany({
            where: {
                userId,
                status: "APPROVED"
            },
            include: {
                club: true
            }
        }),

        prisma.event.findMany({
            where: {
                startTime: {
                    gte: new Date()
                }
            },
            take: 5,
            orderBy: {
                startTime: "asc"
            },
            include: {
                club: true
            }
        }),

        prisma.notification.findMany({
            where: {
                userId,
                isRead: false
            },
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        }),

        prisma.task.findMany({
            where: {
                assignee: {
                    membership: {
                        userId
                    }
                },
                archived: false
            },
            take: 10
        })
    ]);

    res.json({
        success: true,
        dashboard: {
            clubs,
            upcomingEvents,
            notifications,
            tasks
        }
    });

});

module.exports = {
    getClubDashboard
};