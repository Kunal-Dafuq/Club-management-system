const router = require("express").Router();

const {protect}=require("../middleware/authMiddleware");

const controller = require("../controllers/savedMessageController");

router.post(
    "/:messageId",
    protect,
    controller.toggle
);

router.get(
    "/:clubId",
    protect,
    controller.getMine
);

module.exports = router;