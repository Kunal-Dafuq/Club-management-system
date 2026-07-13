const router = require("express").Router();

const cloudUpload = require("../middleware/upload");
const chatUpload = require("../middleware/chatUpload.js");
const uploadSizeValidator = require("../middleware/uploadSizeValidator.js");

const { protect } = require("../middleware/authMiddleware.js");

const {
    uploadClubLogo,
    uploadBanner,
    uploadChatFile
} = require("../controllers/uploadController");

router.patch(
    "/club/:id/logo",
    protect,
    cloudUpload.single("image"),
    uploadClubLogo
);

router.patch(
    "/club/:id/banner",
    protect,
    cloudUpload.single("image"),
    uploadBanner
);

router.post(
    "/chat",
    protect,
    chatUpload.single("file"),
    uploadChatFile
);

module.exports = router;