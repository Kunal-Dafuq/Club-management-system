const { createAuditLog } = require("../services/auditService");

module.exports = async (req, data) => {n
    return createAuditLog({
        ...data,
        performedById: req.user?.id || null,
        ipAddress:
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress,
        userAgent:
            req.headers["user-agent"] || "Unknown"
    });
};