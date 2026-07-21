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

    if (!entity) {
        throw new ApiError(
            400,
            "Upload entity is required."
        );
    }

    if (!fileUrl) {
        throw new ApiError(
            400,
            "File URL is required."
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

        case "meeting-recording":
            await prisma.meetingRecording.create({
                data: {
                    meetingId: Number(entityId),
                    recordingUrl: fileUrl,
                    bucket,
                    storagePath: filePath,
                    mimeType,
                    fileName,
                    checksum,
                    fileSize: size,
                    uploadedById: req.user.id
                }
            });

            break;

        default:
            throw new ApiError(
                400,
                "Unsupported upload entity."
            );
    }

    res.status(200).json({
        success: true,

        storage: {
            fileName,
            fileUrl,
            filePath,
            mimeType,
            fileSize: size,
            checksum,
            bucket,
            storageProvider
        }
    });
});

module.exports = {
    completeTusUpload
};