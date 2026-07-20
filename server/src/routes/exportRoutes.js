const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/exportController");

router.get(
    "/club/:clubId",
    protect,
    controller.exportClub
);

router.get(
    "/committee/:committeeId",
    protect,
    controller.exportCommittee
);

router.get(
    "/event/:eventId",
    protect,
    controller.exportEvent
);

module.exports = router;