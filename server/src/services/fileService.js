const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const uploadFile = async (data, user) => {
    if (!data || !data.fileUrl) {
        throw new ApiError(400, "File data is missing.");
    }

    return prisma.file.create({
        data: {
            fileName: data.fileName,
            fileUrl: data.fileUrl,
            mimeType: data.mimeType,
            size: data.size,
            uploadedById: user.id
        }
    });
};

const getFile = async (id) => {
    const file = await prisma.file.findUnique({
        where: { id }
    });

    if (!file) {
        throw new ApiError(404, "File not found.");
    }

    return file;
};

const deleteFile = async (id, userId) => {
    const file = await getFile(id);

    if (file.uploadedById !== userId) {
        throw new ApiError(403, "You cannot delete this file.");
    }

    await prisma.file.delete({
        where: { id }
    });

    return true;
};

module.exports = {
    uploadFile,
    getFile,
    deleteFile
};