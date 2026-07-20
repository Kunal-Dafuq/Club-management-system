const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {connectCalendar} = require("../controllers/googleCalendarController");

router.get(
    "/connect",
    protect,
    connectCalendar
);

module.exports = router;