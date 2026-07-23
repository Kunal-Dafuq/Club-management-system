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
    try {
        return await prisma.auditLog.create({
            data: {
                action,
                entityType,
                entityId,
                performedById,
                ...(clubId && { club: { connect: { id: Number(clubId) } } }),
                description,
                metadata: metadata || {}
            }
        });
    } catch (err) {
        console.error("Audit log creation failed:", err.message);
    }
};

module.exports = {
    createAuditLog
};