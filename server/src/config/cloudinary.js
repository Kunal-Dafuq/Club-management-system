const { v2: cloudinary } = require("cloudinary");

if(
    !process.env.CLOUDINARY_NAME ||
    !process.env.CLOUDINARY_KEY ||
    !process.env.CLOUDINARY_SECRET
){
    throw new Error("Cloudinary environment variables missing.");
}

module.exports = cloudinary;