const prisma = require("../config/prisma");
const oauth2Client = require("../config/googleOAuth");

const getAuthenticatedClient = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            googleAccessToken: true,
            googleRefreshToken: true,
            googleTokenExpiry: true
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken
    });

    const expired =
        !user.googleTokenExpiry ||
        Date.now() >=
        new Date(user.googleTokenExpiry).getTime();

    if (expired) {
        const { credentials } =
            await oauth2Client.refreshAccessToken();

        oauth2Client.setCredentials(credentials);

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                googleAccessToken:
                    credentials.access_token,
                googleTokenExpiry:
                    credentials.expiry_date
                        ? new Date(credentials.expiry_date)
                        : null
            }
        });
    }

    return oauth2Client;
};

module.exports = {
    getAuthenticatedClient
};