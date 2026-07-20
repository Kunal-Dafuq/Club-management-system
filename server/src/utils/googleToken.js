const { google } = require("googleapis");
const prisma = require("../config/prisma");
const oauth2Client = require("../config/googleOAuth");

const getAuthenticatedClient = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken
    });

    const expiry = user.googleTokenExpiry
        ? new Date(user.googleTokenExpiry).getTime()
        : 0;

    if (Date.now() >= expiry) {

        const { credentials } =
            await oauth2Client.refreshAccessToken();

        oauth2Client.setCredentials(credentials);

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                googleAccessToken: credentials.access_token,
                googleTokenExpiry: new Date(credentials.expiry_date)
            }
        });
    }

    return oauth2Client;
};

module.exports = {
    getAuthenticatedClient
};