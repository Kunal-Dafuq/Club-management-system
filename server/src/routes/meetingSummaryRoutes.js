const router = require("express").Router();

const upload = require("../middleware/upload");

const controller = require("../controllers/meetingSummaryController");

router.post(
    "/:id",
    upload.single("audio"),
    controller.generateSummary
);

router.get(
    "/:id",
    controller.getSummary
);

module.exports = router;