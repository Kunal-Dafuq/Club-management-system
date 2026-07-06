const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    toggleStar,
    getStarredMessages
} = require("../controllers/starController");

router.post(
    "/",
    authMiddleware,
    toggleStar
);

router.get(
    "/",
    authMiddleware,
    getStarredMessages
);

module.exports = router;