const router = require("express").Router();

const {protect} = require("../middleware/authMiddleware");

const {completeTusUpload} = require("../controllers/uploadController");

router.post(
    "/complete",
    protect,
    completeTusUpload
);

module.exports = router;