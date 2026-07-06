const prisma = require("../config/prisma");
const path = require("path");

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

const uploadChatFile = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }

    const mime = req.file.mimetype;

    let category = "OTHER";

    if (mime.startsWith("image/"))
        category = "IMAGE";

    else if (mime.startsWith("video/"))
        category = "VIDEO";

    else if (mime.startsWith("audio/"))
        category = "AUDIO";

    else
        category = "DOCUMENT";

    res.json({
        fileUrl: `/uploads/chat/${req.file.filename}`,
        fileName: req.file.originalname,
        fileType: mime,
        fileExtension: path.extname(req.file.originalname),
        fileSize: req.file.size,
        mimeCategory: category,
        thumbnailUrl: null
    });
};

module.exports = {
    uploadClubLogo,
    uploadBanner,
    uploadChatFile
};