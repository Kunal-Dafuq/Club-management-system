const asyncHandler = require("../middleware/asyncHandler");
const cleanupService = require("../services/cleanupService");
const auditLogger = require("../utils/auditLogger");
const ApiError=require("../utils/ApiError");

const cleanup = asyncHandler(async (req, res) => {

    const admins=[
        "ADMIN",
        "SUPER_ADMIN"
    ];

    if(
        !admins.includes(req.user.role)
    ){
        throw new ApiError(
            403,
            "Administrator access required."
        );
    }

    await cleanupService.cleanupSoftDeleted();

    await auditLogger(req, {
        action: "SYSTEM_CLEANUP",
        entityType: "System",
        description: "Permanent cleanup executed."
    });

    res.status(200).json({
        success: true,
        message: "System cleanup completed successfully."
    });

});

module.exports = {
    cleanup
};