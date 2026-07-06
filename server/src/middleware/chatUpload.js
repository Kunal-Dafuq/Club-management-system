const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../../uploads/chat");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },

    filename(req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024 * 1024
    },

    fileFilter(req, file, cb) {

        const imageTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
        ];

        const videoTypes = [
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "video/x-msvideo",
            "video/x-matroska",
        ];

        const documentTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/zip",
            "application/x-rar-compressed",
            "text/plain",
        ];

        if (
            imageTypes.includes(file.mimetype) ||
            videoTypes.includes(file.mimetype) ||
            documentTypes.includes(file.mimetype)
        ) {
            return cb(null, true);
        }

        cb(new Error("Unsupported file type"));
    },
});

module.exports = upload;