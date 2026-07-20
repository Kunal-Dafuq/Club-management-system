const path = require("path");

const buildStorageInfo = (file) => {
    const extension = path
        .extname(file.fileName)
        .replace(".", "")
        .toLowerCase();

    let category = "DOCUMENT";

    if (file.mimeType.startsWith("image/"))
        category = "IMAGE";

    else if (file.mimeType.startsWith("video/"))
        category = "VIDEO";

    else if (file.mimeType.startsWith("audio/"))
        category = "AUDIO";

    return {
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        storageProvider: "LOCAL_TUS",
        bucket: null,
        storagePath: file.filePath,
        checksum: file.checksum || null,
        size: file.fileSize,
        mimeType: file.mimeType,
        extension,
        category
    };
};

module.exports = {
    buildStorageInfo
};