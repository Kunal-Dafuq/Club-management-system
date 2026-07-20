const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const controller = require("../controllers/auditLogController");

router.get(
    "/",
    protect,
    allowRoles("SUPER_ADMIN"),
    controller.getAuditLogs
);

module.exports = router;