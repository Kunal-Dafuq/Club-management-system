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
    limit = 20
) => {
    const getActivities = async (
        clubId,
        page=1,
        limit=25
    )=>{
        const skip=(page-1)*limit;

        return prisma.activity.findMany({
            where:{
                clubId
            },
            skip,
            take:limit,
            include:{
                user:true
            },
            orderBy:{
               createdAt:"desc"
            }
        });
    };
};

const getActivityStats = async(clubId)=>{
    return prisma.activity.groupBy({
        by:["action"],
        where:{
            clubId
        },
        _count:true
    });
};

module.exports = {
    createActivity,
    getRecentActivities,
    getActivityStats
};