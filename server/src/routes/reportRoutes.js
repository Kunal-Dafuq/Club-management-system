const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/reportController");

router.get(
    "/club/:clubId",
    protect,
    controller.generateClubReport
);

router.get(
    "/event/:eventId",
    protect,
    controller.generateEventReport
);

router.get(
    "/committee/:committeeId",
    protect,
    controller.generateCommitteeReport
);

module.exports = router;