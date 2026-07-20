const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const prisma = require("../config/prisma");

const {getAuthenticatedClient} = require("../utils/googleToken");

const connectCalendar = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    });

    if (!user?.googleRefreshToken) {
        throw new ApiError(
            400,
            "Google account is not connected."
        );
    }

    await getAuthenticatedClient(req.user.id);

    res.json({
        success: true,
        message: "Google Calendar connected successfully."
    });
});

module.exports = {
    connectCalendar
};