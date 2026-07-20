const asyncHandler = require("../middleware/asyncHandler");
const clubDashboardService = require("../services/clubDashboardService");

const getClubDashboard = asyncHandler(async (req, res) => {
    const dashboard = await clubDashboardService.getClubDashboard(
        Number(req.params.clubId)
    );

    res.json({
        success: true,
        dashboard
    });
});

module.exports = {
    getClubDashboard
};