const router = require("express").Router();

const {getGoogleURL,googleCallback} = require("../controllers/googleAuthController");

router.get("/login", getGoogleURL);

router.get("/callback", googleCallback);

module.exports = router;