const prisma = require("../config/prisma");

const asyncHandler = require("../middleware/asyncHandler");

const getAuditLogs = asyncHandler(async(req,res)=>{
    const logs = await prisma.auditLog.findMany({
        include:{
            user:{
                select:{
                    id:true,
                    name:true
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        },
        take:100
    });

    res.json({
        success:true,
        logs
    });
});

module.exports={
    getAuditLogs
};