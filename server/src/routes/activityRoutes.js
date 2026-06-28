const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {getClubActivities} = require("../controllers/activityController");

router.get(
    "/club/:id",
    protect,
    getClubActivities
);

module.exports = router;