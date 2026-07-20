const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");const controller = require("../controllers/systemController");

router.get(
    "/",
    protect,
    controller.systemInfo
);

module.exports = router;