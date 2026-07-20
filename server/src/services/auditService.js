const prisma = require("../config/prisma");

const createAuditLog = async ({
    action,
    entityType,
    entityId,
    performedById,
    clubId = null,
    description = null,
    metadata = null,
    ipAddress = null,
    userAgent = null
}) => {
    return prisma.auditLog.create({
        data: {
            action,
            entityType,
            entityId,
            performedById,
            clubId,
            description,
            metadata: metadata || {},
            ipAddress,
            userAgent
        }
    });
};

module.exports = {
    createAuditLog
};