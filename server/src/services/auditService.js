const prisma=require("../config/prisma");

const createAuditLog=async({
    action,
    entityType,
    entityId,
    performedById,
    clubId,
    description,
    metadata,
    ipAddress,
    userAgent
})=>{
    return prisma.auditLog.create({
        data:{
            action,
            entityType,
            entityId,
            performedById,
            clubId,
            description,
            metadata,
            ipAddress,
            userAgent
        }
    });
};

module.exports={
    createAuditLog
};