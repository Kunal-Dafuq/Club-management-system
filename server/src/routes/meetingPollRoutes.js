const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controllers/meetingPollController");

router.post(
    "/:id",
    protect,
    controller.createPoll
);

router.get(
    "/:id",
    protect,
    controller.getPolls
);

router.patch(
    "/vote/:optionId",
    protect,
    controller.vote
);

module.exports = router;