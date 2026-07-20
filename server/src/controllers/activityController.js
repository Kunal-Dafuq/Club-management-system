const asyncHandler = require("../middleware/asyncHandler");
const activityService = require("../services/activityService");
const ApiError = require("../utils/ApiError");

const getClubActivities = asyncHandler(async (req, res) => {
    const clubId = Number(req.params.id);

    if (Number.isNaN(clubId)) {
        throw new ApiError(400, "Invalid club ID.");
    }

    const activities = await activityService.getRecentActivities(clubId);

    res.status(200).json({
        success: true,
        count: activities.length,
        activities,
    });
});

module.exports = {
    getClubActivities,
};