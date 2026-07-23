const router = require("express").Router();

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
    getTaskStatistics,
    reorderTask
} = require("../controllers/taskController");

const {protect} = require("../middleware/authMiddleware");

const {canManageTask} = require("../middleware/taskPermissionMiddleware");

const {canManageCommittee} = require("../middleware/permissionMiddleware");

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
    canManageTask,
    updateTask
);

router.patch(
    "/:taskId/status",
    protect,
    canManageTask,
    updateStatus
);

router.patch(
    "/:taskId/assign",
    protect,
    canManageTask, 
    assignTask
);

router.patch(
    "/:taskId/archive",
    protect,
    canManageTask, 
    archiveTask
);

router.patch(
    "/:taskId/restore",
    protect,
    canManageTask, 
    restoreTask
);

router.delete(
    "/:taskId",
    protect,
    canManageTask, 
    deleteTask
);

router.get(
    "/committee/:committeeId/stats",
    protect,
    getTaskStatistics
);

router.patch(
    "/:taskId/reorder",
    protect,
    canManageTask,
    reorderTask
);

module.exports = router;