const asyncHandler = require("../middleware/asyncHandler");

const systemService = require("../services/systemService");
const systemInfo = asyncHandler(async (req, res) => {
    const info = await systemService.getSystemInfo();

    res.json({
        success: true,
        system: info
    });

});

module.exports = {
    systemInfo
};