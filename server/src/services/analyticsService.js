const prisma=require("../config/prisma");

const getClubAnalytics=async(clubId)=>{
    const members=await prisma.membership.count({
        where:{
            clubId
        }
    });

    const events=await prisma.event.count({
        where:{
            clubId
        }
    });

    const tasks=await prisma.task.count({
        where:{
            clubId
        }
    });

    return{
        members,
        events,
        tasks
    };
};

module.exports={
    getClubAnalytics
};