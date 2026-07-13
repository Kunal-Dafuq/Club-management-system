const prisma=require("../config/prisma");

const THIRTY_DAYS=30*24*60*60*1000;

const cleanupSoftDeleted=async()=>{
    const limit=new Date(Date.now()-THIRTY_DAYS);

    await prisma.task.deleteMany({
        where:{
            deletedAt:{
                lt:limit
            }
        }
    });

    await prisma.committee.deleteMany({
        where:{
            deletedAt:{
                lt:limit
            }
        }
    });

    await prisma.committeeMeeting.deleteMany({
        where:{
            deletedAt:{
                lt:limit
            }
        }
    });

    await prisma.event.deleteMany({
        where:{
            deletedAt:{
                lt:limit
            }
        }
    });

    await prisma.notification.deleteMany({
        where:{
            deletedAt:{
                lt:limit
            }
        }
    });
};

module.exports={
    cleanupSoftDeleted
};