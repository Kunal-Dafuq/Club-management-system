const router = require("express").Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");

const {uploadClubLogo,uploadBanner} = require("../controllers/uploadController");

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

module.exports = router;