const prisma = require("../config/prisma");

const getClubAnalytics = async (clubId) => {
    const [
        members,
        events,
        meetings,
        tasks,
        completedTasks
    ] = await prisma.$transaction([

        prisma.membership.count({
            where: {
                clubId,
                status: "APPROVED"
            }
        }),

        prisma.event.count({
            where: {
                clubId,
                deletedAt: null
            }
        }),

        prisma.committeeMeeting.count({
            where: {
                committee: {
                    clubId
                }
            }
        }),

        prisma.task.count({
            where: {
                committee: {
                    clubId
                }
            }
        }),

        prisma.task.count({
            where: {
                committee: {
                    clubId
                },
                status: "DONE"
            }
        })
    ]);

    return {
        members,
        events,
        meetings,
        tasks,
        completedTasks,
        completionRate:
        tasks === 0
            ? 0
            : Math.round(
                (completedTasks / tasks) * 100
            )
    };
};

module.exports = {
    getClubAnalytics
};