const asyncHandler = require("../middleware/asyncHandler");
const searchService = require("../services/searchService");

const search = asyncHandler(async (req, res) => {
    const keyword = req.query.q?.trim() || "";

    const results = await searchService.globalSearch(keyword);

    res.json({
        success: true,
        results
    });
});

module.exports = {
    search
};