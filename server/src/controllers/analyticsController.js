const asyncHandler = require("../middleware/asyncHandler");

const analyticsService = require("../services/analyticsService");

const getAnalytics = asyncHandler(async(req,res)=>{
    const analytics = await analyticsService.getClubAnalytics(
        Number(req.params.clubId)
    );

    res.json({
        success:true,
        analytics
    });
});

module.exports={
    getAnalytics
};