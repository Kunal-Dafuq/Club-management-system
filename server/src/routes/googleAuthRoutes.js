const express = require("express");

const router = express.Router();

const controller =
require("../controllers/googleAuthController");

router.get(
    "/login",
    controller.getGoogleURL
);

router.get(
    "/callback",
    controller.googleCallback
);

module.exports = router;