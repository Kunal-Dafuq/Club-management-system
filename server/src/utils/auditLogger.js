const prisma = require("../config/prisma");

const auditLogger = async (req,{
        action,
        entityType,
        entityId,
        performedById,
        metadata = {}
    }
) => {
    try {
        await prisma.auditLog.create({
            data: {
                action: "USER_LOGIN",
                entityType: "User",
                entityId: entityId ? parseInt(entityId, 10) : null, // <-- FIX: Convert string ID to an Integer
                performedById: performedById ? parseInt(performedById, 10) : null,
                metadata: metadata || {}
            }
        });

    } catch (error) {
        console.error(
            "Audit Log Error:",
            error.message
        );
    }
};

module.exports = auditLogger;