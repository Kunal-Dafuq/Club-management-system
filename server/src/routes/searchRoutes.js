const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");
const { search } = require("../controllers/searchController");

router.get(
    "/:clubId",
    protect,
    search
);

module.exports = router;