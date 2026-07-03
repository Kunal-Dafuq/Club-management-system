const router = require("express").Router();

const upload = require("../middleware/upload");          // Cloudinary
const chatUpload = require("../middleware/chatUpload");  // Local disk

const { protect } = require("../middleware/authMiddleware");

const { uploadClubLogo,uploadBanner } = require("../controllers/uploadController");

const { uploadChatFile } = require("../controllers/chatController");

router.patch(
    "/club/:id/logo",
    protect,
    upload.single("image"),
    uploadClubLogo
);

router.patch(
    "/club/:id/banner",
    protect,
    upload.single("image"),
    uploadBanner
);

router.post(
    "/chat",
    protect,
    chatUpload.single("file"),
    uploadChatFile
);

module.exports = router;