const prisma = require("../config/prisma");

const auditLogger = async (req,{
        action,
        entityType,
        entityId,
        metadata = {}
    }
) => {
    try {
        await prisma.auditLog.create({
            data: {

                action,

                entityType,

                entityId: entityId
                    ? String(entityId)
                    : null,

                performedById:
                    req.user?.id ?? null,

                metadata
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