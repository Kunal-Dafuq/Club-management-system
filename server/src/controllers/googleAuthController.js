const asyncHandler = require("../middleware/asyncHandler");
const { getGoogleAuthUrl, exchangeCode } = require("../services/googleAuthService");

const getGoogleURL = asyncHandler(async (req, res) => {
    const url = getGoogleAuthUrl();

    res.json({
        success: true,
        url
    });
});

const googleCallback = asyncHandler(async (req, res) => {
    const { code, state } = req.query;

    await exchangeCode(code, state);

    res.json({
        success: true,
        message: "Google authentication successful."
    });
});

module.exports = {
    getGoogleURL,
    googleCallback
};