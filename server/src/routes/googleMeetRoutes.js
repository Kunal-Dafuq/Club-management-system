const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const { createMeetLink } = require("../controllers/googleMeetController");
router.post(
    "/:eventId",
    protect,
    createMeetLink
);

module.exports = router;