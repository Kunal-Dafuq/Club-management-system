const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.old");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async () => ({
        folder: "clubplanet",
        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ]
    })
});

module.exports = multer({
    storage,
    limits:{
        fileSize:2*1024*1024
    }
});