const permissionService = require("../services/permissionService");
const prisma = require("../config/prisma");

const canManageCommittee = async (
    req,
    res,
    next
) => {
    try {
        let committeeId = Number(
            req.params.committeeId ||
            req.params.id
        );

        if (!committeeId && req.params.taskId) {
            const task = await prisma.task.findUnique({
                where: { id: Number(req.params.taskId) },
                select: { committeeId: true }
            });
            if (task) {
                committeeId = task.committeeId;
            }
        }

        const allowed =
            await permissionService.canManageCommittee(
                req.user.id,
                committeeId
            );

        if (!allowed) {
            return res.status(403).json({
                message: "Permission denied"
            });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Permission check failed"
        });
    }
};

const canDeleteCommittee = async (req, res, next) => {
    try {
        const committeeId = Number(req.params.id);

        const allowed = await permissionService
            .canDeleteCommittee(
                req.user.id,
                committeeId
            );

        if (!allowed) {
            return res.status(403).json({
                message: "Only President can delete committee"
            });
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Permission check failed"
        });
    }
};

module.exports = {
    canManageCommittee,
    canDeleteCommittee
};