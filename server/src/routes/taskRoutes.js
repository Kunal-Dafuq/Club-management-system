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

const {
    protect,
    allowRoles
} = require("../middleware/authMiddleware");

const {
    canManageTask
} = require("../middleware/taskPermissionMiddleware");

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

router.patch(
    "/:taskId/reorder",
    protect,
    canManageTask,
    reorderTask
);

module.exports = {
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
};