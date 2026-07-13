const { createAuditLog } = require("../services/auditService");

module.exports = async (req, data) => {
    return createAuditLog({
        ...data,
        performedById: req.user?.id,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"]
    });
};