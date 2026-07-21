const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware"); 

const adminController = require("../controllers/adminController");

router.post(
    "/cleanup",
    protect,
    allowRoles("SUPER_ADMIN"),
    adminController.cleanup
);

module.exports = router;