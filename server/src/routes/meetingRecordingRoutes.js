const router = require("express").Router();

const {protect} = require("../middleware/authMiddleware");

const controller = require("../controllers/meetingRecordingController");

router.post(
    "/:meetingId",
    protect,
    controller.uploadRecording
);

router.get(
    "/:meetingId",
    protect,
    controller.getRecordings
);

module.exports = router;