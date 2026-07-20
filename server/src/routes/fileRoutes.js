const router = require("express").Router();

const controller = require("../controllers/fileController");
const { protect } = require("../middleware/authMiddleware");

router.post(
    "/",
    protect,
    controller.uploadFile
);

router.get(
    "/:id",
    protect,
    controller.getFile
);

router.delete(
    "/:id",
    protect,
    controller.deleteFile
);

module.exports = router;