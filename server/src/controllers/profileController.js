const prisma = require("../config/prisma");
const asyncHandler = require("../middleware/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
    const profile = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            memberships: {
                include: {
                    club: true
                }
            }
        }
    });

    res.json({
        success: true,
        profile
    });
});

const updateProfile = asyncHandler(async (req, res) => {
    const profile = await prisma.user.update({
        where: {
            id: req.user.id
        },
        data: req.body
    });

    res.json({
        success: true,
        profile
    });
});

module.exports = {
    getProfile,
    updateProfile
};