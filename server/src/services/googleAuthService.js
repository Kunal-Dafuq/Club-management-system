const oauth2Client = require("../config/googleOAuth");

const prisma = require("../config/prisma");

const getGoogleAuthUrl = (userId) => {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/calendar"
        ],
        state: String(userId)
    });
};

const exchangeCode = async (code,userId) => {
    const { tokens } = await oauth2Client.getToken(code);

    await prisma.user.update({
        where: {
            id: userId
        },

        data: {
            googleAccessToken: tokens.access_token,
            googleRefreshToken: tokens.refresh_token,
            googleTokenExpiry: tokens.expiry_date
                ? new Date(tokens.expiry_date)
                : null
        }
    });
};

module.exports = {
    getGoogleAuthUrl,
    exchangeCode
};