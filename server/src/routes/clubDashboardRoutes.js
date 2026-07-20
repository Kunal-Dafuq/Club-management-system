const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const {getClubDashboard} = require("../controllers/clubDashboardController");

router.get(
    "/:clubId/dashboard",
    protect,
    getClubDashboard
);

module.exports = router;