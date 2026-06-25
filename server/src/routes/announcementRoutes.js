const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { sendAnnouncement } = require("../controllers/announcementController");

router.post("/", protect, sendAnnouncement);

module.exports = router;