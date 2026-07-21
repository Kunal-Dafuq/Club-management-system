const prisma = require("../config/prisma");

const createActivity = async ({
    clubId,
    userId,
    action,
    description,
    metadata = null
}) => {
    return prisma.activity.create({
        data: {
            clubId,
            userId,
            action,
            description,
            metadata
        }
    });
};

const getRecentActivities = async (
    clubId,
    page = 1,
    limit = 20
) => {
    const skip = (page - 1) * limit;

    return prisma.activity.findMany({
        where: {
            clubId
        },
        skip,
        take: limit,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePicture: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

const getActivityStats = async (clubId) => {
    const stats = await prisma.activity.groupBy({
        by: ["action"],
        where: {
            clubId
        },
        _count: {
            action: true
        }
    });

    return stats.map((item) => ({
        action: item.action,
        count: item._count.action
    }));
};

module.exports = {
    createActivity,
    getRecentActivities,
    getActivityStats
};