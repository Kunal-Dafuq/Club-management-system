const prisma = require("../config/prisma");

const uploadClubLogo = async (req, res) => {
    try {
        const club = await prisma.club.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                logoUrl: req.file.path
            }
        });

        res.json(club);

    }

    catch (err) {
        console.log(err);
        res.status(500).json({

            message: "Upload failed"
            
        });
    }
};

const uploadBanner = async (req, res) => {
    try {
        const club = await prisma.club.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                bannerUrl: req.file.path
            }
        });

        res.json(club);

    }

    catch (err) {
        console.log(err);
        res.status(500).json({

            message: "Upload failed"

        });
    }
};

module.exports = {
    uploadClubLogo,
    uploadBanner
};