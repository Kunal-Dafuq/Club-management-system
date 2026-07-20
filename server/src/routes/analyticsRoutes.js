const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/analyticsController");

router.get(
    "/:clubId",
    protect,
    controller.getAnalytics
);

module.exports = router;