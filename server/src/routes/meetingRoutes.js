const router = require("express").Router();

const { protect } =
require("../middleware/authMiddleware");

const {
    createMeeting,
    getCommitteeMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    markAttendance
} = require("../controllers/meetingController");

router.post(
    "/committee/:committeeId",
    protect,
    createMeeting
);

router.get(
    "/committee/:committeeId",
    protect,
    getCommitteeMeetings
);

router.get(
    "/:id",
    protect,
    getMeeting
);

router.patch(
    "/:id",
    protect,
    updateMeeting
);

router.delete(
    "/:id",
    protect,
    deleteMeeting
);

router.post(
    "/:id/attendance",
    protect,
    markAttendance
);

module.exports = router;