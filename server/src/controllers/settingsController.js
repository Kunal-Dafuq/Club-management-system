const prisma = require("../config/prisma");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const auditLogger = require("../utils/auditLogger");

const getSettings = asyncHandler(async (req, res) => {
    const settings = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        select: {
            emailNotifications: true,
            pushNotifications: true,
            theme: true
        }
    });

    res.json({
        success: true,
        settings
    });
});

const updateSettings = asyncHandler(async (req, res) => {
    const {
        emailNotifications,
        pushNotifications,
        theme
    } = req.body;

    const updateData = {};

    if (typeof emailNotifications === "boolean") {
        updateData.emailNotifications = emailNotifications;
    }

    if (typeof pushNotifications === "boolean") {
        updateData.pushNotifications = pushNotifications;
    }

    if (theme) {
        if (!["LIGHT", "DARK", "SYSTEM"].includes(theme)) {
            throw new ApiError(
                400,
                "Invalid theme."
            );
        }
        updateData.theme = theme;
    }

    const settings = await prisma.user.update({
        where: {
            id: req.user.id
        },
        data: updateData,
        select: {
            emailNotifications: true,
            pushNotifications: true,
            theme: true
        }
    });

    await auditLogger(req,{
        action:"SETTINGS_UPDATED",
        entityType:"User",
        entityId:req.user.id
    });

    res.json({
        success:true,
        message:"Settings updated successfully.",
        settings
    });
});

module.exports={
    getSettings,
    updateSettings
};