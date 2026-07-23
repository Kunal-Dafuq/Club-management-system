const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/meetingSummaryController");

router.post("/generate-standalone", protect, controller.generateStandaloneSummary);

router.post("/:meetingId/generate", protect, controller.generateSummary);
router.get("/:meetingId", protect, controller.getSummary);

module.exports = router;