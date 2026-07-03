const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createTask,
    getCommitteeTasks,
    getTaskById,
    assignTask,
    updateStatus,
    updateTask,
    archiveTask,
    restoreTask,
    deleteTask,
    getTaskStatistics
} = require("../controllers/taskController");

const {
    canManageCommittee
} = require("../middleware/permissionMiddleware");

router.post(
    "/committee/:committeeId",
    protect,
    canManageCommittee,
    createTask
);

router.get(
    "/committee/:committeeId",
    protect,
    getCommitteeTasks
);

router.get(
    "/:taskId",
    protect,
    getTaskById
);

router.patch(
    "/:taskId",
    protect,
    updateTask
);

router.patch(
    "/:taskId/status",
    protect,
    updateStatus
);

router.patch(
    "/:taskId/assign",
    protect,
    canManageCommittee,
    assignTask
);

router.patch(
    "/:taskId/archive",
    protect,
    canManageCommittee,
    archiveTask
);

router.patch(
    "/:taskId/restore",
    protect,
    canManageCommittee,
    restoreTask
);

router.delete(
    "/:taskId",
    protect,
    canManageCommittee,
    deleteTask
);

router.get(
    "/committee/:committeeId/stats",
    protect,
    getTaskStatistics
);

module.exports = router;