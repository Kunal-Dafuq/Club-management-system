const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/dashboardController");

router.get(
    "/",
    protect,
    controller.getClubDashboard
);

module.exports = router;