const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

router.get(
    "/me",
    protect,
    profileController.getProfile
);

router.put(
    "/me",
    protect,
    profileController.updateProfile
);

module.exports = router;