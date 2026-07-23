const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");

const {
    createMeeting,
    getCommitteeMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    restoreMeeting,
    markAttendance,
    getMeetingStatistics,
    transcribeMeetingRoute,
    summarizeMeetingRoute
} = require("../controllers/meetingController");

router.post("/transcribe", protect, transcribeMeetingRoute);
router.post("/summarize", protect, summarizeMeetingRoute);

router.post("/committee/:committeeId", protect, createMeeting);
router.get("/committee/:committeeId", protect, getCommitteeMeetings);
router.get("/:id", protect, getMeeting);
router.patch("/:id", protect, updateMeeting);
router.delete("/:id", protect, deleteMeeting);
router.patch("/:id/restore", protect, restoreMeeting);
router.patch("/:id/attendance", protect, markAttendance);
router.get("/:id/statistics", protect, getMeetingStatistics);

module.exports = router;