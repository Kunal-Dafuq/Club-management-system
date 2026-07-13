const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    toggleStar,
    getStarredMessages
} = require("../controllers/starController");

router.post(
    "/",
    protect,
    toggleStar
);

router.get(
    "/",
    protect,
    getStarredMessages
);

module.exports = router;