const fs = require("fs/promises");
const prisma = require("../config/prisma");

const ApiError = require("../utils/ApiError");

const uploadFile = async (file, user) => {
    if (!file) {
        throw new ApiError(
            400,
            "No file uploaded."
        );
    }

    return prisma.file.create({
        data: {
            fileName: file.originalname,
            fileUrl: file.path,
            mimeType: file.mimetype,
            size: file.size,
            uploadedById: user.id
        }
    });
};

const getFile = async (id) => {
    const file = await prisma.file.findUnique({
        where: {
            id
        }
    });

    if (!file) {
        throw new ApiError(
            404,
            "File not found."
        );
    }

    return file;

};

const deleteFile = async (id, userId) => {
    const file = await getFile(id);

    if (file.uploadedById !== userId) {
        throw new ApiError(
            403,
            "You cannot delete this file."
        );
    }

    try {
        await fs.unlink(file.fileUrl);
    }
    catch (_) {
    }

    await prisma.file.delete({
        where: {
            id
        }
    });
    return true;
};

module.exports = {
    uploadFile,
    getFile,
    deleteFile
};