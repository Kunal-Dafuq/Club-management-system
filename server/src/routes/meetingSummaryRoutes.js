const router = require("express").Router();

const {protect} = require("../middleware/authMiddleware");

const controller = require("../controllers/meetingSummaryController");

router.post(
    "/:meetingId/generate",
    protect,
    controller.generateSummary
);

router.get(
    "/:meetingId",
    protect,
    controller.getSummary
);

module.exports = router;