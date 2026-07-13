const oauth2Client = require("../config/googleOAuth");

const getGoogleURL = async (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/calendar"
        ],

        prompt: "consent"
    });

    res.json({
        url
    });
};

const googleCallback = async (req, res) => {
    try {
        const { code } = req.query;

        const { tokens } = await oauth2Client.getToken(code);

        await prisma.user.update({
            where:{
                id:req.user.id
            },
            data:{
                googleAccessToken:
                    tokens.access_token,

                googleRefreshToken:
                    tokens.refresh_token,

                googleTokenExpiry:
                    new Date(
                        tokens.expiry_date
                    )
            }
        });

        res.json(tokens);
    }

    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getGoogleURL,
    googleCallback
};