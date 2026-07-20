const prisma = require("../config/prisma");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const completeTusUpload = asyncHandler(async (req, res) => {
    const {
        entity,
        entityId,
        fileName,
        fileUrl,
        filePath,
        mimeType,
        size,
        checksum,
        bucket,
        storageProvider = "SUPABASE"
    } = req.body;

    if (!fileName || !fileUrl) {
        throw new ApiError(
            400,
            "Upload metadata is missing."
        );
    }

    switch (entity) {
        case "club-logo":
            await prisma.club.update({
                where: {
                    id: Number(entityId)
                },
                data: {
                    logoUrl: fileUrl
                }
            });

            break;

        case "club-banner":
            await prisma.club.update({
                where: {
                    id: Number(entityId)
                },
                data: {
                    bannerUrl: fileUrl
                }
            });

            break;

        default:
            throw new ApiError(
                400,
                "Unsupported upload target."
            );
    }

    res.json({
        success: true,
        storage: {
            fileName,
            fileUrl,
            filePath,
            mimeType,
            fileSize: size,
            checksum,
            storageProvider,
            bucket,
            storagePath: filePath
        }
    });
});

module.exports = {
    completeTusUpload
};