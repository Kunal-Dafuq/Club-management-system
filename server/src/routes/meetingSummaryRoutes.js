const router =
require("express").Router();

const {protect}=require("../middleware/authMiddleware");

const controller = require("../controllers/meetingSummaryController");

router.post(
    "/:id",
    protect,
    controller.generateSummary
);

router.get(
    "/:id",
    protect,
    controller.getSummary
);

module.exports=router;